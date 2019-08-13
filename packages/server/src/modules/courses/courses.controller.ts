import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
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

  // POST webi.com/api/courses/abc/pages
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
