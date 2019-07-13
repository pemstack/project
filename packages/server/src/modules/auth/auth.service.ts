import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'modules/users'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<User | null> {
    return await this.usersService.match(username, password) as any
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
