import { Query, Action } from 'app'
import { Schema } from '@pema/state'
import * as yup from 'yup'

export type CoursePermission = 'none' | 'read' | 'write'

export type GetCoursesResult = {
  courseId: string
  title: string
  permission: CoursePermission
  owner: boolean
}

// GET /api/courses
export const GET_COURSES: Query<GetCoursesResult[]> = {
  resource: 'courses',
  async fetch(_, app) {
    return app
      .req('/api/courses')
      .get()
      .json()
  }
}

export interface GetCoursePageParams {
  courseId: string
  pageId: string
}

export type PageAccess = 'private' | 'public' | 'unlisted'

export interface ExistingFile {
  uid: string
  size: number
  name: string
  type: string
}

export interface GetCoursePageResult {
  pageId: string
  courseId: string
  title: string
  content: string
  access: PageAccess
  files: ExistingFile[]
}

// GET /api/courses/:courseid/pages/:pageid
export const GET_COURSE_PAGE: Query<GetCoursePageResult, GetCoursePageParams> = {
  resource: ({ courseId, pageId }) => `courses/${courseId}/pages/${pageId}`,
  async fetch({ courseId, pageId }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages/${pageId}`)
      .get()
      .json()
  }
}

export interface GetCoursePagesParams {
  courseId: string
}

export interface GetCoursePagesResult {
  pageId: string
  title: string
  access: PageAccess
}

// GET /api/courses/:courseid/pages
export const GET_COURSE_PAGES: Query<GetCoursePagesResult[], GetCoursePagesParams> = {
  resource: ({ courseId }) => `courses/${courseId}/pages`,
  async fetch({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages`)
      .get()
      .json()
  }
}

export interface GetCoursePermissionParams {
  courseId: string
}

export interface GetCoursePermissionResult {
  permission: CoursePermission
}

// GET /api/courses/:courseid/permission
export const GET_COURSE_PERMISSION: Query<
  GetCoursePermissionResult,
  GetCoursePermissionParams
> = {
  resource: ({ courseId }) => `courses/${courseId}/permission`,
  async fetch({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}/permission`)
      .get()
      .json()
  }
}

export const createCourseSchema = yup.object({
  title: yup.string().required('course.error.title'),
  access: yup
    .string()
    .oneOf(['private', 'public'])
    .required('course.error.access')
})

export const inviteMembersSchema = yup.object({
  emails: yup
    .array()
    .of(yup
      .string()
      .required('user.error.email.required')
      .email('register.error.email.invalid')
    )
})

export type CreateCourseParams = yup.InferType<typeof createCourseSchema>

export interface CreateCourseResult {
  courseId: string
  title: string
}

// POST /api/courses
export const CREATE_COURSE: Action<CreateCourseParams, CreateCourseResult> = {
  schema: createCourseSchema,
  progress: true,
  async perform(params, app) {
    return await app
      .req('/api/courses', { action: 'createCourse' })
      .post(params)
      .json()
  },
  invalidates: ['courses']
}

export const deleteCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  pageId: yup.string().required()
})

export type DeleteCoursePageParams = yup.InferType<typeof deleteCoursePageSchema>

// DELETE /api/courses/:courseid/pages/:pageid
export const DELETE_COURSE_PAGE: Action<DeleteCoursePageParams> = {
  schema: deleteCoursePageSchema,
  async perform({ courseId, pageId }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages/${pageId}`, { action: 'deleteCoursePage' })
      .delete()
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/pages`]
}

const createCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  title: yup.string().required()
})

export type CreateCoursePageParams = yup.InferType<typeof createCoursePageSchema>

// POST /api/courses/:courseid/pages
export const CREATE_COURSE_PAGE: Action<CreateCoursePageParams> = {
  schema: createCoursePageSchema,
  async perform({ courseId, title }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages`, { action: 'createCoursePage' })
      .post({ title })
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/pages`]
}

export const updateCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  pageId: yup.string().required(),
  title: yup.string().notRequired(),
  access: yup
    .string()
    .oneOf(['private', 'public', 'unlisted'])
    .required(),
  content: yup.string().notRequired(),
  removedFiles: yup.array(yup.string().required()).notRequired()
})

export interface UpdateCoursePageParams {
  courseId: string
  pageId: string
  title?: string
  access?: PageAccess
  content?: string
  files?: any[]
  removedFiles?: string[]
}

export interface UpdateCoursePageResult {
  courseId: string
  pageId: string
}

export const UPDATE_COURSE_PAGE: Action<UpdateCoursePageParams, UpdateCoursePageResult> = {
  schema: updateCoursePageSchema as Schema<UpdateCoursePageParams>,
  progress: true,
  async perform({ courseId, pageId, ...params }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages/${pageId}`, { action: 'updateCoursePage' })
      .patch(params)
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/pages`]
}

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

export const GET_COURSE_POSTS: Query<GetCoursePostsResult, GetCoursePostsParams> = {
  resource: ({
    courseId,
    page,
    pageSize = DEFAULT_PAGE_SIZE
  }) => `courses/${courseId}/posts/pages/${page}-${pageSize}`,
  progress: true,
  async fetch({
    courseId,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE
  }, app) {
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

export const CREATE_COURSE_POST: Action<CreateCoursePostParams> = {
  schema: createCoursePostSchema as Schema<CreateCoursePostParams>,
  progress: true,
  async perform({ courseId, notify = true, content }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts`, { action: 'createCoursePost' })
      .post({ content, notify })
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/posts`]
}

export const updateCoursePostSchema = yup.object({
  courseId: yup.string().required(),
  postId: yup.string().required(),
  content: yup.string().required().min(5)
})

export type UpdateCoursePostParams = yup.InferType<typeof updateCoursePostSchema>

export const UPDATE_COURSE_POST: Action<UpdateCoursePostParams> = {
  schema: updateCoursePostSchema as Schema<UpdateCoursePostParams>,
  progress: true,
  async perform({ courseId, postId, content }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts/${postId}`, { action: 'updateCoursePost' })
      .patch({ content })
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/posts`]
}

export const deleteCoursePostSchema = yup.object({
  courseId: yup.string().required(),
  postId: yup.string().required()
})

export type DeleteCoursePostParams = yup.InferType<typeof deleteCoursePostSchema>

export const DELETE_COURSE_POST: Action<DeleteCoursePostParams> = {
  schema: deleteCoursePostSchema as Schema<DeleteCoursePostParams>,
  progress: true,
  async perform({ courseId, postId }, app) {
    return await app
      .req(`/api/courses/${courseId}/posts/${postId}`, { action: 'deleteCoursePost' })
      .delete()
      .res()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/posts`]
}
