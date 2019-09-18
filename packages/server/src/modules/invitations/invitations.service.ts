import { Injectable, NotFoundException, BadRequestException, Inject, ForbiddenException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { Invitation, InvitationStatus } from './invitations.entity'
import {
  GetUserInvitationsParams,
  GetInvitationParams,
  UpdateInvitationParams,
  CreateInvitationParams,
  CancelInvitationParams
} from './invitations.interface'
import { CoursesService, CoursePermissionLevel } from 'modules/courses'

@Injectable()
export class InvitationsService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager,
    private readonly courses: CoursesService,
  ) { }

  async getUserInvitations({ userEmail }: GetUserInvitationsParams) {
    return await this.entities.find(Invitation, {
      where: { userEmail },
      relations: ['course']
    })
  }

  async getInvitation({ userEmail, courseId }: GetInvitationParams) {
    return await this.entities.findOne(Invitation, { where: { userEmail, courseId } })
  }

  async createInvitation({ requesterUserId, userEmail, courseId, permission }: CreateInvitationParams) {
    const coursePermission = await this.courses.tryGetCoursePermission({ courseId, userId: requesterUserId })
    if (!coursePermission) {
      throw new NotFoundException()
    }

    if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const exists = await this.getInvitation({ userEmail, courseId })
    if (exists) {
      throw new BadRequestException('Invitation has already been made.')
    }

    await this.entities.insert(
      Invitation,
      { userEmail, courseId, permission, status: InvitationStatus.Pending }
    )
  }

  async updateInvitation({ user, courseId, accepted }: UpdateInvitationParams) {
    const invitation = await this.getInvitation({ userEmail: user.email, courseId })

    if (!invitation) {
      throw new NotFoundException('Invitation doesn\'t exist')
    }

    if (invitation.status !== InvitationStatus.Pending) {
      throw new BadRequestException()
    }

    if (accepted) {
      await this.courses.addMemberToCourse({
        userId: user.userId,
        courseId,
        permissionLevel: invitation.permission
      })
    }

    return await this.entities.update(
      Invitation,
      { userEmail: user.email, courseId },
      { status: accepted ? InvitationStatus.Accepted : InvitationStatus.Declined }
    )
  }

  async cancelinvitation({ userEmail, courseId }: CancelInvitationParams) {
    return await this.entities.delete(Invitation, { userEmail, courseId })
  }
}
