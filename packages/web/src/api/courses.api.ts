import { Action, Query } from 'app'
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

export interface CoursePage {
  id: string
  title: string
  isPublic: boolean
}

export interface GetCoursePagesParams {
  id: string
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
