import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common'
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
import { CoursesService } from './courses.service'
import { CreateCourseRequest, CreatePageRequest } from './courses.dto'
import { ReqUser, Authorize } from 'common/decorators'

@ApiUseTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService
  ) { }

  @ApiBearerAuth()
  @Authorize()
  @Post()
  async createCourse(
    @ReqUser('id') userId: string,
    @Body() { title, isPublic }: CreateCourseRequest
  ) {
    const id = await this.courses.createCourse({
      ownerId: userId,
      title,
      isPublic
    })

    return { id }
  }

  @ApiBearerAuth()
  @Authorize()
  @Get(':courseid/access')
  async getAccess(
    @Param('courseid') courseId: string,
    @ReqUser('id') userId: string
  ) {
    const result = await this.courses.tryGetAccess(courseId, userId)
    if (!result) {
      throw new NotFoundException()
    }

    return {
      accessLevel: result.accessLevel
    }
  }

  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages/:pageid')
  async getCoursePage(
    @ReqUser('id') userId: string | null,
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string
  ) {
    return await this.courses.getCoursePage(userId, courseId, pageId)
  }

  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getCourses(@ReqUser('id') userId: string) {
    return await this.courses.getCourses(userId)
  }

  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/pages')
  async createCoursePage(
    @Param('courseid') courseId: string,
    @ReqUser('id') userId: string,
    @Body() { title, content, isPublic }: CreatePageRequest
  ) {
    const id = await this.courses.createCoursePage({
      courseId,
      userId,
      title,
      content,
      isPublic
    })

    return { id }
  }
}