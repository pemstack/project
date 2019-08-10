import { IsString, Matches, IsEmail, MinLength } from 'class-validator'

export class RegisterRequest {
  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  firstName: string

  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @Matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/)
  password: string

  confirmPassword: string
}
