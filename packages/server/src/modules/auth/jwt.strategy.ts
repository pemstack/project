import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from 'modules/users'
import { ConfigService } from 'nestjs-config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'

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

  async validate(payload: JwtPayload) {
    const id = payload.sub
    if (!id) {
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
