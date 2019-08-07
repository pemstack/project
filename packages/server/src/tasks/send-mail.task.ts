import { Injectable } from '@nestjs/common'
import { MailerService } from '@nest-modules/mailer'

@Injectable()
export default class SendMailTask {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  async run(args: string[]) {
    const [, , email] = args
    await this.mailerService.sendMail({
      to: email,
      template: 'confirm-email'
    })

    console.log('Mail sent!')
  }
}
