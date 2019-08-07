import { Module } from '@nestjs/common'
import { HandlebarsAdapter, MailerModule as NestMailerModule } from '@nest-modules/mailer'
import { ConfigService } from 'nestjs-config'
import { inSrc } from 'globals'

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: config.get('mailer.transport'),
        defaults: {
          from: config.get('mailer.from')
        },
        template: {
          dir: inSrc('mailer/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class MailerModule { }
