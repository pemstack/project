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
    return await this.usersService.match(username, password)
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password)
    if (user) {
      return await this.createToken(user)
    } else {
      return null
    }
  }

  async createToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
