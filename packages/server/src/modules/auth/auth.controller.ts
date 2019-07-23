import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { ReqUser } from 'common/decorators'
import { Response } from 'express'
import { User } from 'modules/users'
import { AuthService } from './auth.service'
import { Cookie } from './decorators'
import { LoginRequest, TokenRequest, TokenResponse } from './dtos'
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

  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 401 })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @ReqUser() user: User,
    @Body() { persist = false }: LoginRequest,
    @Res() res: Response) {
    const tokens = await this.authService.createTokens(user, persist)
    this.sendTokens(res, tokens)
  }

  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 401 })
  @Post('token')
  async token(
    @Cookie('refresh_token') refreshToken: string,
    @Body() { persist = true }: TokenRequest,
    @Res() res: Response) {
    const tokens = await this.authService.extendTokens(refreshToken, persist)
    this.sendTokens(res, tokens)
  }

  @ApiResponse({ status: 200 })
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token').status(200).end()
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@ReqUser() user: User) {
    return user
  }
}
