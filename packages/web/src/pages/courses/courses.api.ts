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

export interface GetCoursePageResult {
  pageId: string
  courseId: string
  title: string
  content: string
  access: PageAccess
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
      .req('/api/courses', { action: 'create' })
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
      .req(`/api/courses/${courseId}/pages/${pageId}`, {
        action: 'deleteCoursePage'
      })
      .delete()
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
  content: yup.string().notRequired()
})

export interface UpdateCoursePageParams {
  courseId: string
  pageId: string
  title?: string
  access?: PageAccess
  content?: string
}

export interface UpdateCoursePageResult {
  courseId: string
  pageId: string
}

export const UPDATE_COURSE_PAGE: Action<UpdateCoursePageParams, UpdateCoursePageResult> = {
  schema: updateCoursePageSchema as Schema<UpdateCoursePageParams>,
  async perform({ courseId, pageId, ...params }, app) {
    return await app
    .req(`/api/courses/${courseId}/pages/${pageId}`, { action: 'updateCoursePage' })
    .patch(params)
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/pages`]
}
