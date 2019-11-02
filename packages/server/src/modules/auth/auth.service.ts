import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'modules/users'
import uniqid from 'uniqid'
import { AccessTokenPayload, AuthTokens, RefreshTokenPayload } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<User | null> {
    return await this.usersService.match(username, password)
  }

  async login(username: string, password: string, persist = false) {
    const user = await this.validateUser(username, password)
    if (user) {
      return await this.createTokens(user, persist)
    } else {
      return null
    }
  }

  async extendTokens(refreshToken: string, sessionId: string, persist = true) {
    if (!refreshToken || !sessionId || typeof sessionId !== 'string') {
      throw new UnauthorizedException()
    }

    const payload = await this.jwtService.verifyAsync(refreshToken) as RefreshTokenPayload
    const id = payload.sub
    if (!id || (payload as any).type !== 'refresh') {
      throw new UnauthorizedException()
    }

    if (payload.sid !== sessionId) {
      throw new UnauthorizedException()
    }

    const user = await this.usersService.findOne({ userId: id })
    if (!user) {
      throw new UnauthorizedException()
    }

    return this.createTokens(user, persist && payload.persist, payload.sid)
  }

  async getUserFromSession(
    refreshToken: string,
    sessionId: string
  ): Promise<User | null> {
    if (!refreshToken || !sessionId || typeof sessionId !== 'string') {
      return null
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken) as RefreshTokenPayload
      const id = payload.sub
      if (!id || (payload as any).type !== 'refresh') {
        return null
      }

      if (payload.sid !== sessionId) {
        return null
      }

      return await this.usersService.findOne({ userId: id })
    } catch {
      return null
    }
  }

  async createTokens(user: User, persist = false, sessionId = uniqid()): Promise<AuthTokens> {
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.userId,
      email: user.email.toLowerCase()
    }

    const refreshTokenPayload: RefreshTokenPayload = {
      sub: user.userId,
      type: 'refresh',
      sid: sessionId,
      persist
    }

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: '15m'
      }),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: '7d'
      }),
      sessionId,
      persist
    }
  }
}
