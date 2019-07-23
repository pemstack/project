import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger'
import { ReqUser } from 'common/decorators'
import { Response } from 'express'
import { User } from 'modules/users'
import { AuthService } from './auth.service'
import { Cookie } from './decorators'
import { LoginDto, TokenRequestDto } from './dtos'
import { AuthTokens } from './interfaces'

const persistAge = 7 * 24 * 60 * 60 * 1000

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  private sendTokens(res: Response, tokens: AuthTokens) {
    const { persist, accessToken, refreshToken } = tokens
    const age = persist ? { maxAge: persistAge } : {}
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      ...age
    })

    res.status(200).json({
      access_token: accessToken,
      persist
    })
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @ReqUser() user: User,
    @Body() { persist = false }: LoginDto,
    @Res() res: Response) {
    const tokens = await this.authService.createTokens(user, persist)
    this.sendTokens(res, tokens)
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token').status(200).end()
  }

  @Post('token')
  async token(
    @Cookie('refresh_token') refreshToken: string,
    @Body() { persist = true }: TokenRequestDto,
    @Res() res: Response) {
    const tokens = await this.authService.extendTokens(refreshToken, persist)
    this.sendTokens(res, tokens)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@ReqUser() user: User) {
    return user
  }
}
