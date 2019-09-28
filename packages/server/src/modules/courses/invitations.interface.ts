import { User } from 'modules/users'
import { CoursePermissionLevel } from './courses.entity'

export interface GetUserInvitationsParams {
  userEmail: string
}

export interface GetInvitationParams {
  userEmail: string
  courseId: string
}

export interface CreateInvitationParams {
  requesterUserId: string
  userEmail: string
  courseId: string
  permission: CoursePermissionLevel
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
