import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import recaptchaConfig from './recaptcha.config'
import { RecaptchaService } from './recaptcha.service'
import { Request } from 'express'

const tokenExpiration = parseFloat(recaptchaConfig.tokenExpiration) * 1000

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly recaptchaService: RecaptchaService
  ) { }

  async canActivate(context: ExecutionContext) {
    const action = this.reflector.get<string>('recaptcha-action', context.getHandler())
    if (!action) {
      return true
    }

    const req = context.switchToHttp().getRequest() as Request
    const token = req.headers['captcha-token'] || req.headers['Captcha-Token']
    if (!token || typeof token !== 'string') {
      throw new ForbiddenException('Required CAPTCHA token.')
    }

    const verification = await this.recaptchaService.verify(token, req.ip)
    if (!verification.success) {
      throw new ForbiddenException('Invalid CAPTCHA token.')
    }

    if (verification.action !== action) {
      throw new ForbiddenException('Invalid CAPTCHA action.')
    }

    const now = Date.now()
    if (Math.abs(now - verification.challengeTimestamp) > tokenExpiration) {
      throw new ForbiddenException('Expired CAPTCHA token.')
    }

    (req as any).recaptcha = verification
    return true
  }
}
