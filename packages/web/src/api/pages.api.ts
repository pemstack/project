import { Schema } from '@pema/state'
import { Action, Query } from 'app'
import * as yup from 'yup'

export interface GetCoursePageParams {
  courseId: string
  pageId: string
}

export type PageAccess = 'private' | 'public' | 'unlisted'

export interface ExistingFile {
  fileId: string
  fileName: string
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
  invalidates: ({ courseId }) => [`courses/${courseId}/pages`]
}

const createCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  title: yup.string().required('EditPageForm.error.title'),
  access: yup
    .string()
    .oneOf(['private', 'public', 'unlisted'])
    .required(),
  content: yup.string().notRequired(),
  files: yup.array().notRequired()
})

export type CreateCoursePageParams = yup.InferType<typeof createCoursePageSchema>

// POST /api/courses/:courseid/pages
export const CREATE_COURSE_PAGE: Action<CreateCoursePageParams> = {
  schema: createCoursePageSchema,
  async perform({ courseId, title, access, content, files }, app) {
    return await app
      .req(`/api/courses/${courseId}/pages`, { action: 'createCoursePage' })
      .formData({ title, access, content, files })
      .post()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/pages`]
}

export const updateCoursePageSchema = yup.object({
  courseId: yup.string().required(),
  pageId: yup.string().required(),
  title: yup.string().notRequired(),
  access: yup
    .string()
    .oneOf(['private', 'public', 'unlisted'])
    .notRequired(),
  content: yup.string().notRequired(),
  removedFiles: yup.array(yup.string().required()).notRequired()
})

export interface RcUploadedFile {
  uid: string
  size: number
  name: string
  type: string
}

export interface UpdateCoursePageParams {
  courseId: string
  pageId: string
  title?: string
  access?: PageAccess
  content?: string
  files?: RcUploadedFile[]
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
      .formData(params)
      .patch()
      .res()
  },
  invalidates: ({ courseId }) => [`courses/${courseId}/pages`]
}
