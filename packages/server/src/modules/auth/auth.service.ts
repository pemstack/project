import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'modules/users'
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

  async extendTokens(refreshToken: string, persist = true) {
    if (!refreshToken) {
      throw new UnauthorizedException()
    }

    const payload = await this.jwtService.verifyAsync(refreshToken) as RefreshTokenPayload
    const id = payload.sub
    if (!id || (payload as any).type !== 'refresh') {
      throw new UnauthorizedException()
    }

    const user = await this.usersService.findOne({ id })
    if (!user) {
      throw new UnauthorizedException()
    }

    return this.createTokens(user, persist && payload.persist)
  }

  async createTokens(user: User, persist = false): Promise<AuthTokens> {
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      email: user.email
    }

    const refreshTokenPayload: RefreshTokenPayload = {
      sub: user.id,
      type: 'refresh',
      persist
    }

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: '15m'
      }),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: '7d'
      }),
      persist
    }
  }
}
