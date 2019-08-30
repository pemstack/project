import { Query, Action } from 'app'
import * as yup from 'yup'

export enum CourseAccessLevel {
  None = 'none',
  Read = 'read',
  Write = 'write'
}

export interface Course {
  id: string
  title: string
  access: CourseAccessLevel
  owner: boolean
}

// GET /api/courses
export const GET_COURSES: Query<Course[]> = {
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

export interface CoursePageDetails {
  pageId: string
  courseId: string
  title: string
  content: string
  isPublic: boolean
}

// GET /api/courses/:courseid/pages/:pageid
export const GET_COURSE_PAGE: Query<CoursePageDetails, GetCoursePageParams> = {
  resource: ({ courseId, pageId }) => `courses/${courseId}/pages/${pageId}`,
  async fetch({ courseId, pageId }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages/${pageId}`)
      .get()
      .json()
  }
}

export interface GetCoursePagesParams {
  id: string
}

export interface CoursePage {
  id: string
  title: string
  isPublic: boolean
}

// GET /api/courses/:courseid/pages
export const GET_COURSE_PAGES: Query<CoursePage[], GetCoursePagesParams> = {
  resource: ({ id }) => `courses/${id}/pages`,
  async fetch({ id }, app) {
    return await app
      .req(`/api/courses/${id}/pages`)
      .get()
      .json()
  }
}

export interface GetCourseAccessParams {
  id: string
}

export interface CourseAccess {
  accessLevel: 'none' | 'read' | 'write'
}

// GET /api/courses/:courseid/access
export const GET_COURSE_ACCESS: Query<CourseAccess, GetCourseAccessParams> = {
  resource: ({ id }) => `courses/${id}/access`,
  async fetch({ id }, app) {
    return await app
      .req(`/api/courses/${id}/access`)
      .get()
      .json()
  }
}

export const createCourseSchema = yup.object({
  title: yup.string().required(),
  access: yup.string().oneOf(['private', 'public']).required()
})

export type CreateCourseParams = yup.InferType<typeof createCourseSchema>

export interface CreateCourseResponse {
  id: string
  title: string
}

export const CREATE_COURSE: Action<CreateCourseParams, CreateCourseResponse> = {
  progress: true,
  async perform(params, app) {
    return await app
      .req('/api/courses', { action: 'create' })
      .post(params)
      .json()
  }
}
