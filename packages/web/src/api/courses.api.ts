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
