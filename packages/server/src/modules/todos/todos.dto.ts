import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator'

export class CreateTodoDto {
  @ApiModelProperty({ minLength: 1 })
  @IsString()
  @MinLength(1)
  title: string

  @ApiModelProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  done?: boolean = false
}
