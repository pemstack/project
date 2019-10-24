import { Action, Query } from 'app'
import * as yup from 'yup'

export interface GetGroupsResult {
  groupName: string
}

export interface GetGroupsParams {
  courseId: string
}

// GET /api/courses/:courseid/groups
export const GET_GROUPS: Query<GetGroupsResult[], GetGroupsParams> = {
  resource: ({ courseId }) => `courses/${courseId}/groups`,
  async fetch({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}/groups`)
      .get()
      .json()
  }
}

export const createGroupSchema = yup.object({
  courseId: yup.string().required(),
  groupName: yup.string().required()
})

export type CreateGroupParams = yup.InferType<typeof createGroupSchema>

// POST /api/courses/:courseid/groups
export const CREATE_GROUP: Action<CreateGroupParams> = {
  schema: createGroupSchema,
  progress: true,
  async perform({ courseId, groupName }, app) {
    return app
      .req(`/api/courses/${courseId}/groups/${groupName}`, { action: 'createGroup' })
      .post()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/groups`]
}

export interface DeleteGroupParams {
  courseId: string
  groupName: string
}

// DELETE /api/courses/:courseid/groups/:groupid
export const DELETE_GROUP: Action<DeleteGroupParams> = {
  async perform({ courseId, groupName }, app) {
    return await app
      .req(`/api/courses/${courseId}/groups/${groupName}`)
      .delete()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/groups`]
}
