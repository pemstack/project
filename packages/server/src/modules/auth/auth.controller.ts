import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'
import { ReqUser } from 'common/decorators'
import { User } from 'modules/users'
import { AuthService } from './auth.service'
import { LoginDto, RefreshDto } from './dtos'

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@ReqUser() user: User, @Body() credentials: LoginDto) {
    return this.authService.createTokens(user)
  }

  @Post('refresh')
  async refresh(@Body() { refresh_token }: RefreshDto) {
    return this.authService.extendTokens(refresh_token)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@ReqUser() user: User) {
    return user
  }
}
