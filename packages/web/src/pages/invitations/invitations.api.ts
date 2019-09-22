import { Action, Query } from 'app'
import * as yup from 'yup'
import { CoursePermission } from 'pages/courses/courses.api'

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

// const addTodoSchema = yup.object({
//   title: yup.string().required(),
//   done: yup.boolean().notRequired()
// })

// type AddTodoParams = yup.InferType<typeof addTodoSchema>

// export const ADD_TODO: Action<AddTodoParams, void> = {
//   schema: addTodoSchema,
//   perform(params: AddTodoParams, app) {
//     return app
//       .req('/api/todos')
//       .post(params)
//       .res()
//   },
//   invalidates: ['todos']
// }

// export const CLEAR_TODOS: Action<void, void> = {
//   async perform(_, app) {
//     return app
//       .req('/api/todos')
//       .delete()
//       .res()
//   },
//   invalidates: ['todos']
// }
