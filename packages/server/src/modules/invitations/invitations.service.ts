import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { Invitations, InvitationStatus } from './invitations.entity'
import {
  GetUserInvitationsParams,
  GetInvitationParams,
  UpdateInvitationParams,
  CreateInvitationParams,
  CancelInvitationParams
} from './invitations.interface'
import { CoursesService } from 'modules/courses'

@Injectable()
export class InvitationsService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager,
    private readonly courses: CoursesService
  ) { }

  async getUserInvitations({ userEmail }: GetUserInvitationsParams) {
    return await this.entities.find(Invitations, { where: { userEmail } })
  }

  async getInvitation({ userEmail, courseId }: GetInvitationParams) {
    return await this.entities.findOne(Invitations, { where: { userEmail, courseId } })
  }

  async createInvitation({ userEmail, courseId, permission }: CreateInvitationParams) {
    return await this.entities.insert(
      Invitations,
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
      Invitations,
      { userEmail: user.email, courseId },
      { status: accepted ? InvitationStatus.Accepted : InvitationStatus.Declined }
    )
  }

  async cancelinvitation({ userEmail, courseId }: CancelInvitationParams) {
    return await this.entities.delete(Invitations, { userEmail, courseId })
  }
}
