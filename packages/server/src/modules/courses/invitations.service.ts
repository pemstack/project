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
import { CoursesService } from './courses.service'

@Injectable()
export class InvitationsService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager,
    @Inject(forwardRef(() => CoursesService))
    private readonly courses: CoursesService,
  ) { }

  async getUserInvitations({ userEmail }: GetUserInvitationsParams) {
    userEmail = userEmail.toLowerCase()
    return await this.entities.find(Invitation, {
      where: { userEmail, status: InvitationStatus.Pending },
      relations: ['course']
    })
  }

  async getInvitation({ userEmail, courseId }: GetInvitationParams) {
    userEmail = userEmail.toLowerCase()
    return await this.entities.findOne(Invitation, { userEmail, courseId })
  }

  // async sendInvitationEmail({ userEmail, courseId }: SendInvitationEmailParams) {

  // }

  async createInvitations({ requesterUserId, emails, courseId, permission, group }: CreateInvitationParams) {
    await this.courses.assertWritePermission({ courseId, userId: requesterUserId })

    await Promise.all((emails || []).map(async userEmail => {
      userEmail = userEmail.toLowerCase()
      let exists = !!(await this.getInvitation({ userEmail, courseId }))
      if (!exists) {
        exists = await this.courses.isMemberByEmail({ courseId, email: userEmail })
      }

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
    const userEmail = user.email.toLowerCase()
    const invitation = await this.getInvitation({ userEmail, courseId })

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
      { userEmail, courseId },
      { status: accepted ? InvitationStatus.Accepted : InvitationStatus.Declined }
    )
  }

  async cancelinvitation({ userEmail, courseId }: CancelInvitationParams) {
    userEmail = userEmail.toLowerCase()
    return await this.entities.delete(Invitation, { userEmail, courseId })
  }
}
