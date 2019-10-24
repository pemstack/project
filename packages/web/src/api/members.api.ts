import { Action, Query } from 'app'
import * as yup from 'yup'
import { CoursePermission } from './courses.api'

export interface GetCourseMembersParams {
  courseId: string
}

export interface GetCourseMembersResult {
  name: string | null
  email: string
  permission: CoursePermission
  status: 'member' | 'invited'
}

export const GET_COURSE_MEMBERS: Query<GetCourseMembersResult[], GetCourseMembersParams> = {
  resource: ({ courseId }) => `courses/${courseId}/members`,
  async fetch({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}/members`)
      .get()
      .json()
  }
}

export interface DeleteCourseMemberParams {
  courseId: string
  email: string
}

export const DELETE_COURSE_MEMBER: Action<DeleteCourseMemberParams> = {
  async perform({ courseId, email }, app) {
    return await app
      .req(`/api/courses/${courseId}/members/${email}`, { action: 'deleteCourseMember' })
      .delete()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/members`]
}

export const inviteMembersSchema = yup.object({
  courseId: yup.string().required(),
  emails: yup
    .array()
    .of(yup
      .string()
      .required('user.error.email.required')
      .email('register.error.email.invalid')
    ),
  permission: yup
    .string()
    .oneOf(['read', 'write'])
    .required(),
  group: yup.string().notRequired()
})

export type InviteMembersParams = yup.InferType<typeof inviteMembersSchema>

export const INVITE_MEMBERS: Action<InviteMembersParams> = {
  schema: inviteMembersSchema,
  progress: true,
  async perform({ courseId, emails, permission, group }, app) {
    await app
      .req(`/api/courses/${courseId}/members`)
      .post({ emails, permission, group })
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/members`]
}
