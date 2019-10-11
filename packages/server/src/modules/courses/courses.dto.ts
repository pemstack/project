import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsOptional } from 'class-validator'
import { CourseAccess, PageAccess, CoursePermissionLevel, CoursePermission } from './courses.entity'
import { MulterFile } from 'common/interfaces'

export class GetCoursesResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  permission: CoursePermissionLevel

  @ApiResponseModelProperty()
  owner: boolean
}

export class GetCourseResponse {
  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  access: CourseAccess
}

export class GetCoursePermissionResponse {
  @ApiResponseModelProperty()
  permission: CoursePermissionLevel
}

export class CreateCourseRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ enum: Object.values(CourseAccess) })
  @IsString()
  access: CourseAccess = CourseAccess.Private
}

export class CreateCourseResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  title: string
}

export class UpdateCourseRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  newTitle: string

  @ApiModelProperty({ enum: Object.values(CourseAccess) })
  @IsString()
  access: CourseAccess
}

export class UpdateCourseResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  newTitle: string
}

export class GetCoursePagesResponse {
  @ApiResponseModelProperty()
  pageId: string

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  access: PageAccess
}

export class GetCoursePageResponseFile {
  @ApiResponseModelProperty()
  fileId: string

  @ApiResponseModelProperty()
  fileName: string
}

export class GetCoursePageResponse {
  @ApiResponseModelProperty()
  pageId: string

  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  content: string

  @ApiResponseModelProperty()
  access: PageAccess

  @ApiResponseModelProperty({ type: [GetCoursePageResponseFile] })
  files: GetCoursePageResponseFile[]
}

export class CreateCoursePageRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string

  @ApiModelProperty({ enum: Object.values(PageAccess) })
  @IsOptional()
  @IsString()
  access: PageAccess = PageAccess.Private
}

export class CreateCoursePageResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  pageId: string
}

export class UpdateCoursePageRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string

  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string

  @ApiModelProperty({ enum: Object.values(PageAccess) })
  @IsOptional()
  @IsString()
  access?: PageAccess

  @ApiModelProperty({ required: false })
  @IsOptional()
  removedFiles?: string[]
}

export class UpdateCoursePageResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  pageId: string
}

export class GetCoursePostsResponseItem {
  @ApiResponseModelProperty()
  content: string

  @ApiResponseModelProperty()
  authorId: string

  @ApiResponseModelProperty()
  authorName: string

  @ApiResponseModelProperty()
  posted: Date
}

export class GetCoursePostsResponse {
  @ApiResponseModelProperty()
  items: GetCoursePostsResponseItem[]

  @ApiResponseModelProperty()
  total: number

  @ApiResponseModelProperty()
  pageSize: number
}

export class CreateCoursePostRequest {
  @ApiModelProperty()
  content: string
}

export class UpdateCoursePostRequest {
  @ApiModelProperty()
  content: string
}

export class GetCourseMembersResponse {
  @ApiResponseModelProperty()
  name: string | null

  @ApiResponseModelProperty()
  email: string

  @ApiResponseModelProperty()
  permission: CoursePermissionLevel

  @ApiResponseModelProperty()
  status: 'member' | 'invited'
}

export class InviteCourseMembersRequest {
  @ApiModelProperty()
  emails: string[]

  @ApiModelProperty()
  permission: 'read' | 'write'
}
