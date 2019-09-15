import { Body, Controller, Get, Post, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { MailerService } from '@nest-modules/mailer'
import { Recaptcha, RecaptchaResponse, ReqUser, ReqUrl, ReqLang } from 'common/decorators'
import { User, TokenState } from './users.entity'
import { RegisterRequest, ResendRequest, ConfirmRequest } from './users.dto'
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
  ) { }

  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 401 })
  @RateLimit({ points: 3, duration: 1 })
  // @Recaptcha('register')
  @Post()
  async register(
    @ReqUrl() url: string,
    @ReqLang() lang: string,
    @Body() data: RegisterRequest
  ) {
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
  @Post()
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
  @Post()
  async confirm(
    @Body() { registerToken }: ConfirmRequest
  ) {
    const registration = await this.usersService.getRegistration({ registerToken })

    const { userData } = registration

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
