import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { MailerService } from '@nest-modules/mailer'
import { Recaptcha, RecaptchaResponse, ReqUser, ReqUrl, ReqLang } from 'common/decorators'
import { User } from './users.entity'
import { RegisterRequest } from './users.dto'
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
    await this.usersService.create(user)
    const token = 'TODO'
    await this.mailerService.sendMail({
      to: data.email,
      subject: subjects[lang].confirmEmail,
      template: template('confirm-email', lang),
      context: {
        firstName: data.firstName,
        link: url + '/user/confirm?token=' + token
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
