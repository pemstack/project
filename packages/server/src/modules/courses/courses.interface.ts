import { CourseAccess, PageAccess, CoursePermissionLevel } from './courses.entity'

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

export interface AddMemberToCourseParams {
  userId: string
  courseId: string
  permissionLevel: CoursePermissionLevel
}

export interface TryGetPermissionParams {
  courseId: string
  userId: string | null
}

export interface GetCoursePostsParams {
  courseId: string
  userId: string
  page: number
  pageSize: number
}

export interface CreateCoursePostParams {
  courseId: string
  userId: string
  content: string
}

export interface EditCoursePostParams {
  courseId: string
  postId: string
  userId: string
  content: string
}

export interface DeleteCoursePostParams {
  courseId: string
  postId: string
  userId: string
}
