import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Course, CoursePage, CourseAccess, CourseAccessLevel } from './courses.entity'
import { EntityManager } from 'typeorm'
import uniqid from 'uniqid'
import slugify from 'slugify'
import { unionBy } from 'lodash'

export interface CreateCourseParams {
  ownerId: string
  title: string
  access: 'private' | 'public'
}

export interface CreateCoursePageParams {
  courseId: string
  userId: string
  title: string
  content?: string
  isPublic?: boolean
}

export interface CourseInfo {
  id: string
  title: string
  access: CourseAccessLevel
  owner: boolean
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager
  ) { }

  async createCourse({
    ownerId,
    title,
    access = 'private'
  }: CreateCourseParams): Promise<string> {
    const id = uniqid()
    await this.entities.insert(Course, {
      id,
      ownerId,
      title,
      isPublic: access === 'public'
    })

    return id
  }

  async createCoursePage({
    courseId,
    userId,
    title,
    content = '',
    isPublic = false
  }: CreateCoursePageParams): Promise<string> {
    const access = await this.tryGetAccess(courseId, userId)
    if (!access) {
      throw new NotFoundException()
    }

    if (access.accessLevel !== CourseAccessLevel.Write) {
      throw new ForbiddenException()
    }

    const pageId = slugify(title, { lower: true })

    if (await this.entities.findOne(CoursePage, {
      courseId,
      pageId
    })) {
      throw new BadRequestException('Page already exists.')
    }

    await this.entities.insert(CoursePage, {
      courseId,
      pageId,
      title,
      content,
      isPublic
    })

    return pageId
  }

  async getCourses(userId: string): Promise<CourseInfo[]> {
    const courses = await this.entities.find(Course, {
      where: { ownerId: userId }
    })

    const access = await this.entities.find(CourseAccess, {
      where: { userId },
      relations: ['course']
    })

    const ownCourses = courses.map(c => ({
      id: c.id,
      title: c.title,
      access: CourseAccessLevel.Write,
      owner: true
    }))

    const otherCourses = access.map(a => ({
      id: a.courseId,
      title: a.course.title,
      access: a.accessLevel,
      owner: false
    }))

    return unionBy(ownCourses, otherCourses, c => c.id)
  }

  async getCoursePages(userId: string | null, courseId: string):
    Promise<Array<{ pageId: string, title: string, isPublic: boolean }>> {
    const access = await this.tryGetAccess(courseId, userId)
    if (!access) {
      throw new NotFoundException()
    }

    if (access.accessLevel === CourseAccessLevel.None) {
      throw new ForbiddenException()
    }

    return await this.entities.find(CoursePage, {
      select: ['pageId', 'title', 'isPublic'],
      where: { courseId }
    })
  }

  async getCoursePage(userId: string | null, courseId: string, pageId: string): Promise<CoursePage> {
    const access = await this.tryGetAccess(courseId, userId)
    if (!access) {
      throw new NotFoundException()
    }

    if (access.accessLevel === CourseAccessLevel.None) {
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

    if (!page) {
      throw new NotFoundException()
    }

    if (!userId && !page.isPublic) {
      throw new UnauthorizedException()
    }

    return page
  }

  async tryGetAccess(courseId: string, userId: string | null): Promise<null | {
    course: Course
    accessLevel: CourseAccessLevel
  }> {
    const course = await this.entities.findOne(Course, {
      id: courseId
    })

    if (!course) {
      return null
    }

    if (userId && course.ownerId === userId) {
      return {
        course,
        accessLevel: CourseAccessLevel.Write
      }
    }

    if (!userId) {
      return {
        course,
        accessLevel: course.isPublic ? CourseAccessLevel.Read : CourseAccessLevel.None
      }
    }

    const access = await this.entities.findOne(CourseAccess, {
      courseId,
      userId
    })

    return {
      course,
      accessLevel: access ? access.accessLevel : CourseAccessLevel.None
    }
  }
}
