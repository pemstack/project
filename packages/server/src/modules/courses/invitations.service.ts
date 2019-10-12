import { Injectable, NotFoundException, BadRequestException, Inject, ForbiddenException, forwardRef } from '@nestjs/common'
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
import { CoursePermissionLevel } from './courses.entity'
import { CoursesService } from './courses.service'

@Injectable()
export class InvitationsService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager,
    @Inject(forwardRef(() => CoursesService))
    private readonly courses: CoursesService,
  ) { }

  async getUserInvitations({ userEmail }: GetUserInvitationsParams) {
    return await this.entities.find(Invitation, {
      where: { userEmail, status: InvitationStatus.Pending },
      relations: ['course']
    })
  }

  async getInvitation({ userEmail, courseId }: GetInvitationParams) {
    return await this.entities.findOne(Invitation, { where: { userEmail, courseId } })
  }

  // async sendInvitationEmail({ userEmail, courseId }: SendInvitationEmailParams) {

  // }

  async createInvitations({ requesterUserId, emails, courseId, permission, group }: CreateInvitationParams) {
    await this.courses.assertWritePermission({ courseId, userId: requesterUserId })

    Promise.all((emails || []).map(async userEmail => {
      const exists = await this.getInvitation({ userEmail, courseId })
      if (!exists) {
        await this.entities.insert(
          Invitation,
          { userEmail, courseId, permission, group, status: InvitationStatus.Pending }
        )

        // this.sendInvitationEmail({ userEmail, courseId })
      }
    }))
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
        permissionLevel: invitation.permission,
        group: invitation.group
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
