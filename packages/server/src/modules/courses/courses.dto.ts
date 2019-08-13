import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateCourseRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string
}

export class CreatePageRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false })
  @IsString()
  content?: string
}
