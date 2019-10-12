import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Delete,
  Patch,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiUseTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger'
import { CoursesService } from './courses.service'
import { InvitationsService } from './invitations.service'
import {
  CreateCourseRequest,
  GetCoursePermissionResponse,
  CreateCourseResponse,
  GetCoursePagesResponse,
  GetCoursePageResponse,
  CreateCoursePageRequest,
  CreateCoursePageResponse,
  UpdateCoursePageRequest,
  UpdateCoursePageResponse,
  GetCoursePostsResponse,
  CreateCoursePostRequest,
  UpdateCoursePostRequest,
  UpdateCourseRequest,
  UpdateCourseResponse,
  GetCourseMembersResponse,
  InviteCourseMembersRequest,
  GetCoursesResponse,
  GetCourseResponse,
  GetCoursePageResponseFile
} from './courses.dto'
import { ReqUser, Authorize, Cookie } from 'common/decorators'
import { plainToClass } from 'class-transformer'
import { CoursePermissionLevel } from './courses.entity'
import { MulterFile } from 'common/interfaces'
import { Response } from 'express'
import { inProject, inUploads } from 'globals'
import { AuthService } from 'modules/auth'

@ApiUseTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly courses: CoursesService,
    private readonly invitations: InvitationsService,
    private readonly auth: AuthService
  ) { }

  // Courses

  @ApiResponse({ status: 200, type: [GetCoursesResponse] })
  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getCourses(
    @ReqUser('userId') userId: string
  ): Promise<GetCoursesResponse[]> {
    return await this.courses.getCourses({ userId })
  }

  @ApiResponse({ status: 200, type: GetCourseResponse })
  @ApiBearerAuth()
  @Authorize()
  @Get(':courseid')
  async getCourse(
    @ReqUser('userId') userId: string,
    @Param('courseid') courseId: string
  ): Promise<GetCourseResponse> {
    const result = await this.courses.getCourse({ userId, courseId })
    return {
      title: result.title,
      access: result.access
    }
  }

  @ApiResponse({ status: 200, type: GetCoursePermissionResponse })
  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/permission')
  async getCoursePermission(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string
  ): Promise<GetCoursePermissionResponse> {
    const permission = await this.courses.tryGetCoursePermission({ courseId, userId })
    if (!permission) {
      throw new NotFoundException()
    }

    return {
      permission: permission.permissionLevel
    }
  }

  @ApiResponse({ status: 201, type: CreateCourseResponse })
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

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Patch(':courseid')
  async updateCourse(
    @Param('courseid') courseId: string,
    @ReqUser('userid') userId: string,
    @Body() { newTitle, access }: UpdateCourseRequest
  ): Promise<UpdateCourseResponse> {
    await this.courses.updateCourse({ courseId, userId, newTitle, access })

    return { courseId, newTitle }
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Delete(':courseid')
  async deleteCourse(
    @Param('courseid') courseId: string,
    @ReqUser('userid') userId: string
  ): Promise<void> {
    await this.courses.deleteCourse({ courseId, userId })
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
    const { page: coursePage, files } = await this.courses.getCoursePage({
      userId,
      courseId,
      pageId
    })

    return {
      pageId: coursePage.pageId,
      courseId: coursePage.courseId,
      title: coursePage.title,
      content: coursePage.content,
      access: coursePage.access,
      files: (files || []).map(({ fileId, fileName }) => ({ fileId, fileName }))
    }
  }

  @ApiResponse({ status: 201, type: CreateCoursePageResponse })
  @ApiBearerAuth()
  @Authorize()
  @UseInterceptors(FilesInterceptor('files[]'))
  @Post(':courseid/pages')
  async createCoursePage(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string,
    @Body() { title, content, access }: CreateCoursePageRequest,
    @UploadedFiles() files: MulterFile[]
  ): Promise<CreateCoursePageResponse> {
    const pageId = await this.courses.createCoursePage({
      courseId,
      userId,
      title,
      content,
      access,
      files
    })

    return { courseId, pageId }
  }

  @ApiResponse({ status: 200, type: UpdateCoursePageRequest })
  @ApiBearerAuth()
  @Authorize()
  @UseInterceptors(FilesInterceptor('files[]'))
  @Patch(':courseid/pages/:pageid')
  async updateCoursePage(
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string,
    @ReqUser('userId') userId: string,
    @Body() { title, content, access, removedFiles }: UpdateCoursePageRequest,
    @UploadedFiles() files: MulterFile[]
  ): Promise<UpdateCoursePageResponse> {
    const newPageId = await this.courses.updateCoursePage({
      courseId,
      pageId,
      userId,
      title,
      content,
      access,
      files,
      removedFiles
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

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/pages/:pageid/:fileid')
  async downloadFile(
    @ReqUser('userid') userId: string,
    @Param('courseid') courseId: string,
    @Param('pageid') pageId: string,
    @Param('fileid') fileId: string,
    @Cookie('refresh_token') refreshToken: string,
    @Cookie('session_id') sessionId: string,
    @Res() res: Response
  ) {
    if (!userId && refreshToken && sessionId) {
      const user = await this.auth.getUserFromSession(refreshToken, sessionId)
      if (user) {
        userId = user.userId
      }
    }

    const fileName = await this.courses.getFile({ courseId, userId, pageId, fileId })

    res.download(inUploads(fileId), fileName)
  }

  // Posts

  // GET /api/courses/:courseid/posts
  @ApiResponse({ status: 200, type: GetCoursePostsResponse })
  @Authorize(['jwt', 'anonymous'])
  @Get(':courseid/posts')
  async getCoursePosts(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('page-size') pageSize: number = 4
  ): Promise<GetCoursePostsResponse> {
    const asInt = (x: any, defaultValue: number) => {
      const parsed = typeof x === 'string' ? parseInt(x) : x
      return isNaN(parsed) || typeof parsed !== 'number' ? defaultValue : parsed
    }

    page = asInt(page, 1)
    pageSize = asInt(pageSize, 4)
    if (pageSize > 20) {
      pageSize = 20
    }

    const { items, pageSize: pageSizeResult, total } = await this.courses.getCoursePosts({ userId, courseId, page, pageSize })
    return {
      items: items.map(({ postId, content, author, posted }) => ({
        postId,
        content,
        authorId: author.userId,
        authorName: `${author.firstName} ${author.lastName}`,
        posted
      })),
      pageSize: pageSizeResult,
      total
    }
  }

  // POST /api/courses/:courseid/posts
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/posts')
  async createCoursePost(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string,
    @Body() { content }: CreateCoursePostRequest
  ): Promise<void> {
    await this.courses.createCoursePost({ courseId, userId, content })
  }

  // PATCH /api/courses/:courseid/posts/:postid
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Authorize()
  @Patch(':courseid/posts/:postid')
  async updateCoursePost(
    @Param('courseid') courseId: string,
    @Param('postid') postId: string,
    @ReqUser('userId') userId: string,
    @Body() { content }: UpdateCoursePostRequest
  ): Promise<void> {
    await this.courses.updateCoursePost({ courseId, postId, userId, content })
  }

  // DELETE /api/courses/:courseid/posts/:postid
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Authorize()
  @Delete(':courseid/posts/:postid')
  async deleteCoursePost(
    @Param('courseid') courseId: string,
    @Param('postid') postId: string,
    @ReqUser('userId') userId: string
  ): Promise<void> {
    await this.courses.deleteCoursePost({ courseId, postId, userId })
  }

  // Members

  // GET /api/courses/:courseid/members
  @ApiResponse({ status: 200, type: [GetCourseMembersResponse] })
  @ApiBearerAuth()
  @Authorize()
  @Get(':courseid/members')
  async getCourseMembers(
    @Param('courseid') courseId: string,
    @ReqUser('userId') userId: string
  ): Promise<GetCourseMembersResponse[]> {
    return await this.courses.getCourseMembers({ courseId, userId })
  }

  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/members')
  async inviteCourseMembers(
    @Param('courseid') courseId: string,
    @ReqUser('userId') requesterUserId: string,
    @Body() { emails, permission, group }: InviteCourseMembersRequest
  ): Promise<void> {
    let coursePermissionlevel: CoursePermissionLevel
    switch (permission || 'none') {
      case 'read':
        coursePermissionlevel = CoursePermissionLevel.Read
        break
      case 'write':
        coursePermissionlevel = CoursePermissionLevel.Write
        break
      default:
        throw new BadRequestException()
    }

    await this.invitations.createInvitations({
      requesterUserId,
      courseId,
      emails,
      permission: coursePermissionlevel,
      group
    })
  }

  // DELETE /api/courses/:courseid/members/:email
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Delete(':courseid/members/:email')
  async deleteCourseMember(
    @Param('courseid') courseId: string,
    @Param('email') email: string,
    @ReqUser('userId') userId: string
  ): Promise<void> {
    await this.courses.deleteCourseMember({ courseId, userId, email })
  }

  // GROUPS

  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Authorize()
  @Post(':courseid/groups/:groupname')
  async createGroup(
    @Param('courseid') courseId: string,
    @Param('groupname') groupName: string,
    @ReqUser('userId') userId: string
  ): Promise<void> {
    await this.courses.createGroup({ courseId, userId, groupName })
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Delete(':courseid/groups/:groupname')
  async deleteGroup(
    @Param('courseid') courseId: string,
    @Param('groupname') groupName: string,
    @ReqUser('userId') userId: string
  ): Promise<void> {
    await this.courses.deleteGroup({ courseId, userId, groupName })
  }
}
