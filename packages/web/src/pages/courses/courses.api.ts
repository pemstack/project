import { Query, Action } from 'app'
import * as yup from 'yup'

export type CoursePermission = 'none' | 'read' | 'write'

export interface Course {
  id: string
  title: string
  permission: CoursePermission
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

export type PageAccess = 'private' | 'public' | 'unlisted'

export interface CoursePageDetails {
  pageId: string
  courseId: string
  title: string
  content: string
  access: PageAccess
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
  access: PageAccess
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

export interface GetCoursePermissionParams {
  id: string
}

export interface GetCoursePermissionResponse {
  permission: CoursePermission
}

// GET /api/courses/:courseid/permission
export const GET_COURSE_PERMISSION: Query<GetCoursePermissionResponse, GetCoursePermissionParams> = {
  resource: ({ id }) => `courses/${id}/permission`,
  async fetch({ id }, app) {
    return await app
      .req(`/api/courses/${id}/permission`)
      .get()
      .json()
  }
}

export const createCourseSchema = yup.object({
  title: yup.string().required('course.error.title'),
  access: yup.string().oneOf(['private', 'public']).required('course.error.access')
})

export type CreateCourseParams = yup.InferType<typeof createCourseSchema>

export interface CreateCourseResponse {
  id: string
  title: string
}

// POST /api/courses
export const CREATE_COURSE: Action<CreateCourseParams, CreateCourseResponse> = {
  schema: createCourseSchema,
  progress: true,
  async perform(params, app) {
    return await app
      .req('/api/courses', { action: 'create' })
      .post(params)
      .json()
  }
}

export const deleteCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  pageId: yup.string().required()
})

export type DeleteCoursePageParams = yup.InferType<typeof deleteCoursePageSchema>

// DELETE /api/courses/:courseid/pages/:pageid
export const DELETE_COURSE_PAGE: Action<DeleteCoursePageParams> = {
  schema: deleteCoursePageSchema,
  progress: true,
  async perform({ courseId, pageId }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages/${pageId}`, { action: 'deleteCoursePage' })
      .delete()
  },
  invalidates: ({ params: { courseId } }) => [`courses/${courseId}/pages`],
  optimistic: ({ params: { courseId, pageId } }) => ({
    [`courses/${courseId}/pages/`]: ({ value }) => {
      const pages = value as CoursePage[]
      return pages.filter(page => page.id !== pageId)
    }
  })
}
