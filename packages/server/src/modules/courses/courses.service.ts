import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Course, CoursePage, CourseAccess, AccessLevel } from './courses.entity'
import { EntityManager } from 'typeorm'
import uniqid from 'uniqid'
import slugify from 'slugify'
import { unionBy } from 'lodash'

export interface CreateCourseParams {
  ownerId: string
  title: string
}

export interface CreateCoursePageParams {
  courseId: string
  userId: string
  title: string
  content?: string
}

export interface CourseInfo {
  id: string
  title: string
  access: AccessLevel
  owner: boolean
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectEntityManager() readonly entities: EntityManager
  ) { }

  async createCourse({ ownerId, title }: CreateCourseParams) {
    const id = uniqid()
    await this.entities.insert(Course, {
      id,
      ownerId,
      title
    })

    return id
  }

  async createCoursePage({
    courseId,
    userId,
    title,
    content = ''
  }: CreateCoursePageParams) {
    const access = await this.getAccess(courseId, userId)
    if (!access) {
      throw new NotFoundException()
    }

    if (access.accessLevel !== AccessLevel.Write) {
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
      content
    })
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
      access: AccessLevel.Write,
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

  async getAccess(courseId: string, userId: string) {
    const course = await this.entities.findOne(Course, {
      id: courseId
    })

    if (!course) {
      return null
    }

    if (course.ownerId === userId) {
      return {
        course,
        accessLevel: AccessLevel.Write
      }
    }

    const access = await this.entities.findOne(CourseAccess, {
      courseId,
      userId
    })

    return {
      course,
      accessLevel: access ? access.accessLevel : AccessLevel.None
    }
  }
}
