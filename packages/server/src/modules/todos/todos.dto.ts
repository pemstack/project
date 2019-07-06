import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsBoolean, IsOptional } from 'class-validator'

export class CreateTodoDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(1)
  title: string

  @IsBoolean()
  @IsOptional()
  @ApiModelProperty()
  done?: boolean = false
}
