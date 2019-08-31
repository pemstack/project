import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common'
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { CoursesService } from './courses.service'
import { CreateCourseRequest, CreatePageRequest, CoursePageResponse, CoursePageDetailsResponse } from './courses.dto'
import { ReqUser, Authorize } from 'common/decorators'
import { plainToClass } from 'class-transformer'

@ApiUseTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService
  ) { }

  // Courses

  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getCourses(@ReqUser('id') userId: string) {
    return await this.courses.getCourses(userId)
  }

  @ApiBearerAuth()
  @Authorize()
  @Get(':courseid/permission')
  async getCoursePermission(
    @Param('courseid') courseId: string,
    @ReqUser('id') userId: string
  ) {
    const permission = await this.courses.tryGetPermission(courseId, userId)
    if (!permission) {
      throw new NotFoundException()
    }

    return {
      permission: permission.permissionLevel
    }
  }

  @ApiBearerAuth()
  @Authorize()
  @Post()
  async createCourse(
    @ReqUser('id') userId: string,
    @Body() { title, access }: CreateCourseRequest
  ) {
    const id = await this.courses.createCourse({
      ownerId: userId,
      title,
      access
    })

    return { id, title }
  }

  // Pages

  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages')
  async getCoursePages(
    @Param('courseid') courseId: string,
    @ReqUser('id') userId: string
  ) {
    const pages = await this.courses.getCoursePages(userId, courseId)
    return pages.map(page => plainToClass(CoursePageResponse, page))
  }

  @ApiResponse({ status: 200, type: CoursePageDetailsResponse })
  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages/:pageid')
  async getCoursePage(
    @ReqUser('id') userId: string | null,
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string
  ) {
    const coursePage = await this.courses.getCoursePage(userId, courseId, pageId)
    return plainToClass(CoursePageDetailsResponse, coursePage)
  }

  @ApiResponse({ status: 200, type: [CoursePageResponse] })
  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/pages')
  async createCoursePage(
    @Param('courseid') courseId: string,
    @ReqUser('id') userId: string,
    @Body() { title, content, access }: CreatePageRequest
  ) {
    const id = await this.courses.createCoursePage({
      courseId,
      userId,
      title,
      content,
      access
    })

    return { id }
  }
}
