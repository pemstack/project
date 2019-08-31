import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'
import { CourseAccess, PageAccess } from './courses.entity'

export class CreateCourseRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ enum: Object.values(CourseAccess) })
  @IsString()
  access: CourseAccess = CourseAccess.Private
}

export class CreatePageRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false })
  @IsString()
  content?: string

  @ApiModelProperty({ enum: Object.values(PageAccess) })
  @IsString()
  access: PageAccess = PageAccess.Private
}

export class CoursePageResponse {
  @ApiResponseModelProperty()
  pageId: string

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  access: PageAccess
}

export class CoursePageDetailsResponse {
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
}
