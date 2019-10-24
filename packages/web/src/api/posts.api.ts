import { Action, Query } from 'app'
import * as yup from 'yup'

export interface GetCoursePostsParams {
  courseId: string
  page?: number
  pageSize?: number
}

export interface GetCoursePostsResultItem {
  postId: string
  content: string
  authorId: string
  authorName: string
  posted: Date
}

export interface GetCoursePostsResult {
  items: GetCoursePostsResultItem[]
  total: number
  pageSize: number
}

export const DEFAULT_PAGE_SIZE = 4

// GET /api/courses/:courseid/posts
export const GET_COURSE_POSTS: Query<GetCoursePostsResult, GetCoursePostsParams> = {
  resource: ({
    courseId,
    page,
    pageSize = DEFAULT_PAGE_SIZE
  }) => `courses/${courseId}/posts/pages/${page}-${pageSize}`,
  progress: true,
  async fetch(
    {
      courseId,
      page = 1,
      pageSize = DEFAULT_PAGE_SIZE
    },
    app
  ) {
    return await app
      .req(`/api/courses/${courseId}/posts?page=${page}&page-size=${pageSize}`)
      .get()
      .json()
  }
}

export const createCoursePostSchema = yup.object({
  courseId: yup.string().required(),
  content: yup.string().required().min(5),
  notify: yup.boolean().notRequired()
})

export type CreateCoursePostParams = yup.InferType<typeof createCoursePostSchema>

// POST /api/courses/:courseid/posts
export const CREATE_COURSE_POST: Action<CreateCoursePostParams> = {
  schema: createCoursePostSchema,
  progress: true,
  async perform({ courseId, notify = true, content }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts`, { action: 'createCoursePost' })
      .post({ content, notify })
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/posts`]
}

export const updateCoursePostSchema = yup.object({
  courseId: yup.string().required(),
  postId: yup.string().required(),
  content: yup.string().required().min(5)
})

export type UpdateCoursePostParams = yup.InferType<typeof updateCoursePostSchema>

// PATCH /api/courses/:courseid/posts/:postid
export const UPDATE_COURSE_POST: Action<UpdateCoursePostParams> = {
  schema: updateCoursePostSchema,
  progress: true,
  async perform({ courseId, postId, content }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts/${postId}`, { action: 'updateCoursePost' })
      .patch({ content })
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/posts`]
}

export const deleteCoursePostSchema = yup.object({
  courseId: yup.string().required(),
  postId: yup.string().required()
})

export type DeleteCoursePostParams = yup.InferType<typeof deleteCoursePostSchema>

// DELETE /api/courses/:courseid/posts/:postid
export const DELETE_COURSE_POST: Action<DeleteCoursePostParams> = {
  schema: deleteCoursePostSchema,
  progress: true,
  async perform({ courseId, postId }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts/${postId}`, { action: 'deleteCoursePost' })
      .delete()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/posts`]
}
