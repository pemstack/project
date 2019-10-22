import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { inPackages, inSrc } from 'globals'
import { MailerModule } from 'mailer'
import { AuthModule } from 'modules/auth'
import { CoursesModule } from 'modules/courses'
import { RecaptchaGuard, RecaptchaModule } from 'modules/recaptcha'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter'

@Module({
  imports: [
    ...(process.env.NODE_ENV === 'production' ? [
      ServeStaticModule.forRoot({
        rootPath: inPackages('web/build')
      })
    ] : []),
    ConfigModule.load(
      inSrc('**/!(*.d.ts).config.{ts,js}'),
      {
        modifyConfigName: name => name.replace('.config', '')
      }
    ),
    RateLimiterModule.register({
      points: 50,
      duration: 5,
      type: 'Memory'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    MailerModule,
    RecaptchaModule,
    AuthModule,
    CoursesModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RecaptchaGuard
    }
  ]
})
export class AppModule { }
