import { Body, Controller, Delete, Get, Param, Post, NotFoundException } from '@nestjs/common'
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
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
    @Body() { title }: CreateCourseRequest
  ) {
    await this.courses.createCourse({
      ownerId: userId,
      title
    })
  }

  @ApiBearerAuth()
  @Authorize()
  @Get(':id/access')
  async getAccess(
    @Param('id') id: string,
    @ReqUser('id') userId: string
  ) {
    const result = await this.courses.getAccess(id, userId)
    if (!result) {
      throw new NotFoundException()
    }

    return {
      accessLevel: result.accessLevel
    }
  }

  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getCourses(@ReqUser('id') userId: string) {
    return await this.courses.getCourses(userId)
  }

  @ApiBearerAuth()
  @Authorize()
  @Post(':id/pages')
  async createCoursePage(
    @Param('id') id: string,
    @ReqUser('id') userId: string,
    @Body() { title, content }: CreatePageRequest
  ) {
    await this.courses.createCoursePage({
      courseId: id,
      userId,
      title,
      content
    })
  }
}
