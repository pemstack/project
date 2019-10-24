import { Action, Query } from 'app'
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

export interface GetCourseParams {
  courseId: string
}

export interface GetCourseResult {
  title: string
  access: 'private' | 'public'
}

// GET /api/courses/:courseid
export const GET_COURSE: Query<GetCourseResult, GetCourseParams> = {
  resource: ({ courseId }) => `courses/${courseId}`,
  async fetch({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}`)
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
    .required('course.error.access'),
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

export const updateCourseSchema = yup.object({
  courseId: yup.string().required(),
  newTitle: yup.string().required('UpdateCourse.error.title'),
  access: yup
    .string()
    .oneOf(['private', 'public'])
    .required()
})

export type UpdateCourseParams = yup.InferType<typeof updateCourseSchema>

export interface UpdateCourseResult {
  courseId: string
  newTitle: string
}

// PATCH /api/courses/:courseid
export const UPDATE_COURSE: Action<UpdateCourseParams, UpdateCourseResult> = {
  schema: updateCourseSchema,
  progress: true,
  async perform({ courseId, newTitle, access }, app) {
    return await app
      .req(`/api/courses/${courseId}`, { action: 'updateCourse' })
      .patch({ newTitle, access })
      .json()
  },
  invalidates: ['courses']
}

export const deleteCourseSchema = yup.object({
  courseId: yup.string().required(),
  eager: yup.boolean().notRequired()
})

export type DeleteCourseParams = yup.InferType<typeof deleteCourseSchema>

// DELETE /api/courses/:courseid
export const DELETE_COURSE: Action<DeleteCourseParams> = {
  schema: deleteCourseSchema,
  progress: true,
  eager: ({ eager = false }) => eager,
  async perform({ courseId }, app) {
    return await app
      .req(`/api/courses/${courseId}`, { action: 'deleteCourse' })
      .delete()
      .res()
  },
  invalidates: ['courses']
}
