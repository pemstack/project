import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards, BadRequestException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { Recaptcha, RecaptchaResponse, ReqUser } from 'common/decorators'
import { User } from './users.entity'
import { RegisterRequest } from './users.dto'
import { UsersService } from './users.service'
import { RateLimit } from 'nestjs-rate-limiter'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @RateLimit({ points: 3, duration: 1 })
  // @Recaptcha('register')
  @Post()
  async register(@Body() data: RegisterRequest) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException()
    }

    const user = new User(data)
    await this.usersService.create(user)
  }
}
