import { Action, Query } from 'app'
import * as yup from 'yup'
import { CoursePermission } from './courses.api'

export interface GetUserInvitationsResult {
  courseId: string
  courseTitle: string
  permission: CoursePermission
  dateInvited: string
}

export const GET_USER_INVITATIONS: Query<GetUserInvitationsResult[]> = {
  resource: 'invitations',
  async fetch(_, app) {
    return await app
      .req('/api/invitations')
      .get()
      .json()
  }
}

const updateInvitationSchema = yup.object({
  courseId: yup.string().required(),
  accepted: yup.boolean().required()
})

export type UpdateInvitationParams = yup.InferType<typeof updateInvitationSchema>

export const UPDATE_INVITATION: Action<UpdateInvitationParams> = {
  schema: updateInvitationSchema,
  progress: true,
  async perform({ courseId, accepted }, app) {
    return await app
      .req(`/api/invitations/${courseId}`)
      .patch({ accepted })
      .res()
  },
  invalidates: ['invitations', 'courses']
}
