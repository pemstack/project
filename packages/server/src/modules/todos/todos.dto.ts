import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator'

export class CreateTodoRequest {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  done?: boolean = false
}

export class TodoResponse {
  @ApiResponseModelProperty()
  id: number

  @ApiResponseModelProperty()
  title: string

  @ApiResponseModelProperty()
  done: boolean
}
