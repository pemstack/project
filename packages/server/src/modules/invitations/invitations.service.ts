import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { Invitations, InvitationStatus } from './invitations.entity'
import {
  GetUserInvitationsParams,
  GetInvitationParams,
  DeclineInvitationParams,
  CancelInvitationParams,
  CreateInvitationParams
} from './invitations.interface'

@Injectable()
export class InvitationsService {
  constructor(@InjectEntityManager() readonly entities: EntityManager) { }

  async getUserInvitations({ userEmail }: GetUserInvitationsParams) {
    return await this.entities.find(Invitations, { where: { userEmail } })
  }

  async getInvitation({ userEmail, courseId }: GetInvitationParams) {
    return await this.entities.find(Invitations, { where: { userEmail, courseId } })
  }

  async createInvitation({ userEmail, courseId, permission }: CreateInvitationParams) {
    return await this.entities.insert(
      Invitations,
      { userEmail, courseId, permission, status: InvitationStatus.Pending }
    )
  }

  async declineInvitation({ userEmail, courseId }: DeclineInvitationParams) {
    return await this.entities.update(
      Invitations,
      { userEmail, courseId },
      { status: InvitationStatus.Declined }
    )
  }

  async cancelinvitation({ userEmail, courseId }: CancelInvitationParams) {
    return await this.entities.delete(Invitations, { userEmail, courseId })
  }
}
