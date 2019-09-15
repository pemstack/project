import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional } from 'class-validator'

export class LoginRequest {
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

export class TokenRequest {
  @ApiModelProperty()
  sessionId: string

  @ApiModelProperty({ required: false, default: true })
  @IsOptional() @IsBoolean()
  persist?: boolean = true
}

export class TokenResponse {
  @ApiResponseModelProperty()
  accessToken: string

  @ApiResponseModelProperty()
  sessionId: string

  @ApiResponseModelProperty()
  persist: boolean
}
