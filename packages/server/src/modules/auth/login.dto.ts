import { ApiModelProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @ApiModelProperty()
  @IsString()
  username: string

  @ApiModelProperty()
  @IsString()
  password: string
}
