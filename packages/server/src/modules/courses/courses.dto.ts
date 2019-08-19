import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateCourseRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false })
  isPublic?: boolean = false
}

export class CreatePageRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false })
  @IsString()
  content?: string

  @ApiModelProperty({ required: false })
  isPublic?: boolean = false
}

export class CoursePageResponse {
  @ApiResponseModelProperty()
  pageId: string

  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  content: string

  @ApiResponseModelProperty()
  isPublic: boolean
}
