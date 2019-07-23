import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from 'modules/users'
import { ConfigService } from 'nestjs-config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AccessTokenPayload } from '../interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.jwtSecret')
    })
  }

  async validate(payload: AccessTokenPayload) {
    const id = payload.sub
    if (!id || (payload as any).type === 'refresh') {
      throw new UnauthorizedException()
    }

    const result = await this.usersService.findOne({ id })
    if (!result) {
      throw new UnauthorizedException()
    }

    const { password, ...user } = result
    return user
  }
}
