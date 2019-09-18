import { CoursePermissionLevel } from "modules/courses";
import { User } from "modules/users";

export interface GetUserInvitationsParams {
  userEmail: string
}

export interface GetInvitationParams {
  userEmail: string
  courseId: string
}

export interface CreateInvitationParams {
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
