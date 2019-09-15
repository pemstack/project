import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from 'modules/users'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    const user = req.user as User
    return user && user.roles && user.roles.some((role: string) => roles.includes(role)) || false
  }
}
