import { Body, Controller, Get, Post, Res, UseGuards, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { ReqUser } from 'common/decorators'
import { Response } from 'express'
import { User } from 'modules/users'
import { AuthService } from './auth.service'
import { Cookie } from './decorators'
import { LoginRequest, TokenRequest, TokenResponse } from './dtos'
import { AuthTokens } from './interfaces'
import { RateLimit } from 'nestjs-rate-limiter'

const persistAge = 7 * 24 * 60 * 60 * 1000

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  private sendTokens(res: Response, tokens: AuthTokens) {
    const { persist, accessToken, refreshToken, sessionId } = tokens
    const age = persist ? { maxAge: persistAge } : {}
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      ...age
    })

    res.cookie('session_id', sessionId, {
      sameSite: 'lax',
      ...age
    })

    res.status(200).json({
      accessToken,
      sessionId,
      persist
    })
  }

  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 401 })
  @RateLimit({ points: 3, duration: 1 })
  @Post('login')
  async login(
    @Body() { username, password, persist }: LoginRequest,
    @Res() res: Response) {
    const tokens = await this.authService.login(username, password, persist)
    if (!tokens) {
      throw new UnauthorizedException()
    }

    this.sendTokens(res, tokens)
  }

  @ApiResponse({ status: 200, type: TokenResponse })
  @ApiResponse({ status: 401 })
  @Post('token')
  async token(
    @Cookie('refresh_token') refreshToken: string,
    @Cookie('session_id') sessionId: string,
    @Body() { persist = true }: TokenRequest,
    @Res() res: Response) {
    const tokens = await this.authService.extendTokens(refreshToken, sessionId, persist)
    this.sendTokens(res, tokens)
  }

  @ApiResponse({ status: 200 })
  @Post('logout')
  async logout(@Res() res: Response) {
    res
      .clearCookie('refresh_token')
      .clearCookie('session_id')
      .status(200)
      .end()
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
