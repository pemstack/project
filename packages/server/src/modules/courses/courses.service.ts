import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import {
  Course,
  CoursePage,
  CoursePermission,
  CoursePermissionLevel,
  CourseAccess,
  PageAccess,
  CoursePost
} from './courses.entity'
import {
  GetCoursesParams,
  CreateCourseParams,
  GetCoursePagesParams,
  GetCoursePageParams,
  CreateCoursePageParams,
  UpdateCoursePageParams,
  DeleteCoursePageParams,
  TryGetPermissionParams,
  AddMemberToCourseParams,
  GetCoursePostsParams,
  CreateCoursePostParams,
  EditCoursePostParams,
  DeleteCoursePostParams
} from './courses.interface'
import uniqid from 'uniqid'
import slugify from 'slugify'
import { unionBy } from 'lodash'
import { reduceObject } from 'common/utils'
import { plainToClass } from 'class-transformer'

@Injectable()
export class CoursesService {
  constructor(@InjectEntityManager() readonly entities: EntityManager) { }

  // Courses

  async getCourses({ userId }: GetCoursesParams) {
    const courses = await this.entities.find(Course, {
      where: { ownerId: userId }
    })

    const permission = await this.entities.find(CoursePermission, {
      where: { userId },
      relations: ['course']
    })

    const ownCourses = courses.map(c => ({
      courseId: c.courseId,
      title: c.title,
      permission: CoursePermissionLevel.Write,
      owner: true
    }))

    const otherCourses = permission.map(a => ({
      courseId: a.courseId,
      title: a.course.title,
      permission: a.permissionLevel,
      owner: false
    }))

    return unionBy(ownCourses, otherCourses, c => c.courseId)
  }

  async createCourse({
    ownerId,
    title,
    access = CourseAccess.Private
  }: CreateCourseParams): Promise<string> {
    const courseId = uniqid()
    await this.entities.insert(Course, {
      courseId,
      ownerId,
      title,
      access
    })

    return courseId
  }

  async getCoursePages({
    userId,
    courseId
  }: GetCoursePagesParams) {
    const permission = await this.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    if (permission.permissionLevel === CoursePermissionLevel.None) {
      throw new ForbiddenException()
    }

    return await this.entities.find(CoursePage, {
      select: ['pageId', 'title', 'access'],
      where: { courseId }
    })
  }

  async getCoursePage({
    userId,
    courseId,
    pageId
  }: GetCoursePageParams) {
    const permission = await this.tryGetCoursePermission({ courseId, userId })
    // Course does not exist.
    if (!permission) {
      throw new NotFoundException()
    }

    // Course is private.
    if (permission.permissionLevel === CoursePermissionLevel.None) {
      if (userId) {
        throw new ForbiddenException()
      } else {
        throw new UnauthorizedException()
      }
    }

    const page = await this.entities.findOne(CoursePage, {
      pageId,
      courseId
    })

    // Page does not exist.
    if (!page) {
      throw new NotFoundException()
    }

    // Page is public - anyone can see it.
    if (page.access === PageAccess.Public) {
      return page
    }

    // Course is public but page is private and user is not authenticated/a course member
    if (!permission.isMember) {
      if (userId) {
        throw new ForbiddenException()
      } else {
        throw new UnauthorizedException()
      }
    }

    return page
  }

  async createCoursePage({
    courseId,
    userId,
    title,
    content = '',
    access = PageAccess.Private
  }: CreateCoursePageParams): Promise<string> {
    const coursePermission = await this.tryGetCoursePermission({ courseId, userId })
    if (!coursePermission) {
      throw new NotFoundException()
    }

    if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const pageId = slugify(title, { lower: true })

    if (
      await this.entities.findOne(CoursePage, {
        courseId,
        pageId
      })
    ) {
      throw new BadRequestException('Page already exists.')
    }

    await this.entities.insert(CoursePage, {
      courseId,
      pageId,
      title,
      content,
      access
    })

    return pageId
  }

  async updateCoursePage({
    courseId,
    pageId,
    userId,
    title,
    content,
    access
  }: UpdateCoursePageParams): Promise<string> {
    const coursePermission = await this.tryGetCoursePermission({ courseId, userId })
    if (!coursePermission) {
      throw new NotFoundException()
    }

    if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const newPageId = title ? slugify(title, { lower: true }) : pageId

    if (pageId !== newPageId) {
      if (
        await this.entities.findOne(CoursePage, {
          courseId,
          pageId: newPageId
        })
      ) {
        throw new BadRequestException('Page name already exists.')
      }
    }

    await this.entities.update(
      CoursePage,
      {
        courseId,
        pageId
      },
      reduceObject({
        pageId: newPageId,
        title,
        content,
        access
      })
    )

    return newPageId
  }

  async deleteCoursePage({
    userId,
    courseId,
    pageId
  }: DeleteCoursePageParams) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    if (!courseId || !pageId) {
      throw new BadRequestException()
    }

    const coursePermission = await this.tryGetCoursePermission({ courseId, userId })
    if (!coursePermission) {
      throw new NotFoundException()
    }

    if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const result = await this.entities.delete(CoursePage, { courseId, pageId })

    // if (result.affected === 0) {
    //   throw new NotFoundException()
    // }
  }

  // Posts

  async getCoursePosts({
    courseId,
    userId,
    page,
    pageSize = 10
  }: GetCoursePostsParams) {
    const permission = await this.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    if (permission.permissionLevel === CoursePermissionLevel.None) {
      if (!userId) {
        throw new UnauthorizedException()
      } else {
        throw new ForbiddenException()
      }
    }

    const total = await this.entities.count(CoursePost, {
      where: { courseId }
    })

    const items = await this.entities.find(CoursePost, {
      relations: ['author'],
      where: { courseId },
      order: { posted: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return {
      items,
      pageSize,
      total
    }
  }

  async createCoursePost({ courseId, userId, content }: CreateCoursePostParams) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    const permission = await this.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    if (permission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException() // 401
    }

    await this.entities.insert(CoursePost, {
      courseId,
      authorId: userId,
      content
    })
  }

  async updateCoursePost({ courseId, postId, userId, content }: EditCoursePostParams) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    const permission = await this.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    if (permission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const postExists = await this.entities.find(CoursePost, {
      where: { courseId, postId }
    })

    if (!postExists) {
      throw new NotFoundException()
    }

    if (content.length < 5) {
      throw new BadRequestException()
    }

    await this.entities.update(CoursePost, { courseId, postId }, { content })
  }

  async deleteCoursePost({ courseId, postId, userId }: DeleteCoursePostParams) {
    if (!userId) {
      throw new UnauthorizedException()
    }

    const permission = await this.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    if (permission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const postExists = this.entities.find(CoursePost, {
      where: { courseId, postId }
    })

    if (!postExists) {
      throw new NotFoundException()
    }

    await this.entities.delete(CoursePost, { courseId, postId })
  }

  // Permissions

  async addMemberToCourse({ userId, courseId, permissionLevel }: AddMemberToCourseParams) {
    if (!userId || !courseId) {
      throw new NotFoundException()
    }

    if (!permissionLevel) {
      throw new BadRequestException()
    }

    return await this.entities.insert(CoursePermission, { userId, courseId, permissionLevel })
  }

  async tryGetCoursePermission({
    courseId,
    userId
  }: TryGetPermissionParams) {
    const course = await this.entities.findOne(Course, { courseId })
    if (!course) {
      return null
    }

    if (userId && course.ownerId === userId) {
      return {
        course,
        permissionLevel: CoursePermissionLevel.Write,
        isMember: true
      }
    }

    if (!userId) {
      return {
        course,
        permissionLevel:
          course.access === CourseAccess.Public
            ? CoursePermissionLevel.Read
            : CoursePermissionLevel.None,
        isMember: false
      }
    }

    const permission = await this.entities.findOne(CoursePermission, {
      courseId,
      userId
    })

    return {
      course,
      permissionLevel: permission
        ? permission.permissionLevel
        : course.access === CourseAccess.Public ?
          CoursePermissionLevel.Read : CoursePermissionLevel.None,
      isMember: permission && permission.permissionLevel !== CoursePermissionLevel.None
    }
  }
}
