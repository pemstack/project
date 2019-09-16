import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { MailerService } from '@nest-modules/mailer'
import { Recaptcha, RecaptchaResponse, ReqUser, ReqUrl, ReqLang } from 'common/decorators'
import { User, TokenState } from './users.entity'
import { RegisterRequest, ResendRequest, ConfirmRequest, ResetRequest } from './users.dto'
import { UsersService } from './users.service'
import { RateLimit } from 'nestjs-rate-limiter'
import { template, subjects } from 'mailer'
import moment from 'moment'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService
  ) {}

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
        link: url + '/user/confirm/' + registerToken
      }
    })

    return { resendToken }
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('resend')
  @Post('resend')
  async resend(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() { resendToken }: ResendRequest
  ) {
    const registration = await this.usersService.getRegistration({ resendToken })
    const { email, firstName } = registration.userData
    await this.mailerService.sendMail({
      to: email,
      subject: subjects[lang].confirmEmail,
      template: template('confirm-email', lang),
      context: {
        firstName,
        link: url + '/user/confirm?token=' + registration.registerToken
      }
    })
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('resend')
  @Post('confirm')
  async confirm(@Body() { registerToken }: ConfirmRequest) {
    console.log('token sent: ' + registerToken)
    await this.usersService.completeRegistration({ registerToken })
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha()
  @Post('reset')
  async resetPassword(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() { email }: ResetRequest
  ) {
    const { resetToken, resendToken } = await this.usersService.initiatePasswordReset(email)
    await this.mailerService.sendMail({
      to: email,
      subject: subjects[lang].resetPassword,
      template: template('reset-password', lang),
      context: {
        link: url + '/user/reset/' + resetToken
      }
    })

    return { resendToken }
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  @RateLimit({ points: 1, duration: 1 })
  // @Recaptcha('resend')
  @Post('resendpasswordreset')
  async resendPasswordReset(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() { resendToken }: ResendRequest
  ) {
    const reset = await this.usersService.getResetToken({ resendToken })
    const { email, resetToken } = reset
    await this.mailerService.sendMail({
      to: email,
      subject: subjects[lang].resetPassword,
      template: template('reset-password', lang),
      context: {
        link: url + '/user/reset/' + resetToken
      }
    })
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
