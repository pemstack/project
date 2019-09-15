import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Delete,
  Patch
} from '@nestjs/common'
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { CoursesService } from './courses.service'
import {
  CreateCourseRequest,
  GetCourseResponse,
  GetCoursePermissionResponse,
  CreateCourseResponse,
  GetCoursePagesResponse,
  GetCoursePageResponse,
  CreateCoursePageRequest,
  CreateCoursePageResponse,
  UpdateCoursePageRequest,
  UpdateCoursePageResponse
} from './courses.dto'
import { ReqUser, Authorize } from 'common/decorators'
import { plainToClass } from 'class-transformer'

@ApiUseTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) { }

  // Courses

  @ApiResponse({ status: 200, type: [GetCourseResponse] })
  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getCourses(
    @ReqUser('userId') userId: string
  ): Promise<GetCourseResponse[]> {
    return await this.courses.getCourses({ userId })
  }

  @ApiResponse({ status: 200, type: GetCoursePermissionResponse })
  @ApiBearerAuth()
  @Authorize()
  @Get(':courseid/permission')
  async getCoursePermission(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string
  ): Promise<GetCoursePermissionResponse> {
    const permission = await this.courses.tryGetPermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    return {
      permission: permission.permissionLevel
    }
  }

  @ApiResponse({ status: 200, type: CreateCourseResponse })
  @ApiBearerAuth()
  @Authorize()
  @Post()
  async createCourse(
    @ReqUser('userId') ownerId: string,
    @Body() { title, access }: CreateCourseRequest
  ): Promise<CreateCourseResponse> {
    const courseId = await this.courses.createCourse({
      ownerId,
      title,
      access
    })

    return { courseId, title }
  }

  // Pages

  @ApiResponse({ status: 200, type: [GetCoursePagesResponse] })
  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages')
  async getCoursePages(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string
  ): Promise<GetCoursePagesResponse[]> {
    const pages = await this.courses.getCoursePages({ userId, courseId })
    return pages.map(page => plainToClass(GetCoursePagesResponse, page))
  }

  @ApiResponse({ status: 200, type: GetCoursePageResponse })
  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages/:pageid')
  async getCoursePage(
    @ReqUser('userId') userId: string | null,
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string
  ): Promise<GetCoursePageResponse> {
    const coursePage = await this.courses.getCoursePage({
      userId,
      courseId,
      pageId
    })

    return plainToClass(GetCoursePageResponse, coursePage)
  }

  @ApiResponse({ status: 200, type: CreateCoursePageResponse })
  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/pages')
  async createCoursePage(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string,
    @Body() { title, content, access }: CreateCoursePageRequest
  ): Promise<CreateCoursePageResponse> {
    const pageId = await this.courses.createCoursePage({
      courseId,
      userId,
      title,
      content,
      access
    })

    return { courseId, pageId }
  }

  @ApiResponse({ status: 200, type: UpdateCoursePageRequest })
  @ApiBearerAuth()
  @Authorize()
  @Patch(':courseid/pages/:pageid')
  async updateCoursePage(
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string,
    @ReqUser('userId') userId: string,
    @Body() { title, content, access }: UpdateCoursePageRequest
  ): Promise<UpdateCoursePageResponse> {
    const newPageId = await this.courses.updateCoursePage({
      courseId,
      pageId,
      userId,
      title,
      content,
      access
    })

    return { courseId, pageId: newPageId }
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Delete(':courseid/pages/:pageid')
  async deleteCoursePage(
    @ReqUser('userId') userId: string,
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string
  ): Promise<void> {
    await this.courses.deleteCoursePage({ userId, courseId, pageId })
  }
}
