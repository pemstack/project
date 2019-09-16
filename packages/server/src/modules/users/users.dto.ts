import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, Matches, IsEmail, MinLength } from 'class-validator'

export class RegisterRequest {
  @ApiModelProperty()
  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  firstName: string

  @ApiModelProperty()
  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  lastName: string

  @ApiModelProperty()
  @IsEmail()
  email: string

  @ApiModelProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/)
  password: string
}

export class ResendRequest {
  @ApiModelProperty()
  @IsString()
  resendToken: string
}

export class ConfirmRequest {
  @ApiModelProperty()
  @IsString()
  registerToken: string
}

export class ResetRequest {
  @ApiModelProperty()
  @IsString()
  email: string
}
