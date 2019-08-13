import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Course, CoursePage, CourseAccess, AccessLevel } from './courses.entity'
import { EntityManager } from 'typeorm'
import uniqid from 'uniqid'
import slugify from 'slugify'

interface CreateCourseParams {
  ownerId: string
  title: string
}

interface CreateCoursePageParams {
  courseId: string
  userId: string
  title: string
  content?: string
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
    const { entities } = this
    const [course] = await entities.find(Course, {
      where: { id: courseId },
      relations: ['access']
    })

    if (!course) {
      throw new NotFoundException()
    }

    if (course.ownerId !== userId
      || course.access.some(a => a.userId === userId && a.access === AccessLevel.Write)) {
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
}
