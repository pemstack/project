import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const Authorize = (type: string | string[] = 'jwt') => UseGuards(AuthGuard(type))
