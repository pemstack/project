import { CourseAccess, PageAccess } from './courses.entity'

export interface GetCoursesParams {
  userId: string
}

export interface CreateCourseParams {
  ownerId: string
  title: string
  access: CourseAccess
}

export interface GetCoursePagesParams {
  userId: string | null
  courseId: string
}

export interface GetCoursePageParams {
  userId: string | null
  courseId: string
  pageId: string
}

export interface CreateCoursePageParams {
  courseId: string
  userId: string
  title: string
  content?: string
  access: PageAccess
}

export interface UpdateCoursePageParams {
  courseId: string
  pageId: string
  userId: string
  title?: string
  content?: string
  access?: PageAccess
}

export interface DeleteCoursePageParams {
  userId: string
  courseId: string
  pageId: string
}

export interface TryGetPermissionParams {
  courseId: string,
  userId: string | null
}
