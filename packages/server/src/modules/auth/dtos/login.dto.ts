import { ApiModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional } from 'class-validator'

export class LoginDto {
  @ApiModelProperty()
  @IsString()
  username: string

  @ApiModelProperty()
  @IsString()
  password: string

  @ApiModelProperty({ required: false, default: false })
  @IsOptional() @IsBoolean()
  persist?: boolean = false
}
