import { User } from 'modules/users'
import { CoursePermissionLevel } from './courses.entity'

export interface GetUserInvitationsParams {
  userEmail: string
}

export interface GetInvitationParams {
  userEmail: string
  courseId: string
}

export interface SendInvitationEmailParams {
  userEmail: string
  courseId: string
}

export interface CreateInvitationParams {
  requesterUserId: string
  emails: string[]
  courseId: string
  permission: CoursePermissionLevel
  group: string
}

export interface DeclineInvitationParams {
  userEmail: string
  courseId: string
}

export interface UpdateInvitationParams {
  user: User
  courseId: string
  accepted: boolean
}

export interface CancelInvitationParams {
  userEmail: string
  courseId: string
}
