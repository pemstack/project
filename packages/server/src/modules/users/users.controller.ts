import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  Param,
  Patch
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { MailerService } from '@nest-modules/mailer'
import { ReqUser, ReqUrl, ReqLang } from 'common/decorators'
import { User } from './users.entity'
import {
  RegisterRequest,
  ResendRequest,
  ConfirmRequest,
  InitiateResetPasswordRequest,
  ResetPasswordRequest
} from './users.dto'
import { UsersService } from './users.service'
import { RateLimit } from 'nestjs-rate-limiter'
import { template, subjects } from 'mailer'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService
  ) { }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('register-confirm')
  @Post('register/confirm')
  @HttpCode(200)
  async confirm(@Body() { registerToken }: ConfirmRequest) {
    const email = await this.usersService.completeRegistration({ registerToken })
    return { email }
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('register-resend')
  @Post('register/resend')
  @HttpCode(200)
  async resend(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() { resendToken }: ResendRequest
  ) {
    const registration = await this.usersService.getRegisterConfirmToken({ resendToken })
    const { email, firstName } = registration.userData
    await this.mailerService.sendMail({
      to: email,
      subject: subjects[lang].confirmEmail,
      template: template('confirm-email', lang),
      context: {
        firstName,
        link: url + '/user/confirm/' + registration.registerToken
      }
    })

    return {}
  }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @RateLimit({ points: 3, duration: 1 })
  // @Recaptcha('register')
  @Post('register')
  async register(@ReqUrl() url: string, @ReqLang() lang: string, @Body() data: RegisterRequest) {
    const user = new User(data)
    const { registerToken, resendToken } = await this.usersService.initiateRegistration(user)
    await this.mailerService.sendMail({
      to: data.email,
      subject: subjects[lang].confirmEmail,
      template: template('confirm-email', lang),
      context: {
        firstName: data.firstName,
        link: url + '/user/register/confirm/' + registerToken
      }
    })

    return { resendToken }
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('password-reset')
  @Post('password/reset')
  async initiateResetPassword(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() { email }: InitiateResetPasswordRequest
  ) {
    const resetToken = await this.usersService.initiatePasswordReset(email)
    await this.mailerService.sendMail({
      to: email,
      subject: subjects[lang].resetPassword,
      template: template('reset-password', lang),
      context: {
        link: url + '/user/forgot-password/' + resetToken
      }
    })
  }

  @ApiResponse({ status: 200 })
  @RateLimit({ points: 3, duration: 1 })
  // @Recaptcha('password-resend')
  @Get('password/reset/:resettoken')
  async getPasswordResetTokenState(
    @Param('resettoken') resetToken: string
  ) {
    return await this.usersService.getPasswordResetTokenState(resetToken)
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('password-resend')
  @Patch('password/reset/:resettoken')
  async resetPassword(
    @Param('resettoken') resetToken: string,
    @Body() { newPassword }: ResetPasswordRequest
  ) {
    return await this.usersService.resetPassword(resetToken, newPassword)
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
