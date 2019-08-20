import { Action, Query } from 'app'
import * as yup from 'yup'
import i18n from 'i18next'

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
  cache: true,
  async fetch(app) {
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

// GET /api/courses/:courseid/pages/
export function GET_COURSE_PAGE({ courseId, pageId }: GetCoursePageParams): Query<CoursePageDetails> {
  return {
    factory: GET_COURSE_PAGE,
    resource: `courses/${courseId}/pages/${pageId}`,
    cache: true,
    params: { courseId, pageId },
    async fetch(app) {
      return await app
        .req(`/api/courses/${courseId}/pages/${pageId}`)
        .get()
        .json()
    }
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

export function GET_COURSE_PAGES({ id }: GetCoursePagesParams): Query<CoursePage[]> {
  return {
    factory: GET_COURSE_PAGES,
    resource: `courses/${id}/pages`,
    cache: true,
    params: { id },
    async fetch(app) {
      return await app
        .req(`/api/courses/${id}/pages`)
        .get()
        .json()
    }
  }
}

export interface GetCourseAccessParams {
  id: string
}

export interface CourseAccess {
  accessLevel: 'none' | 'read' | 'write'
}

export function GET_COURSE_ACCESS({ id }: GetCourseAccessParams): Query<CourseAccess> {
  return {
    factory: GET_COURSE_ACCESS,
    resource: `courses/${id}/access`,
    cache: true,
    params: { id },
    async fetch(app) {
      return await app
        .req(`/api/courses/${id}/access`)
        .get()
        .json()
    }
  }
}
