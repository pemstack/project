import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { inProject, inSrc } from 'globals'
import { MailerModule } from 'mailer'
import { AuthModule } from 'modules/auth'
import { RecaptchaGuard, RecaptchaModule } from 'modules/recaptcha'
import { TodosModule } from 'modules/todos'
import { CoursesModule } from 'modules/courses'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter'

@Module({
  imports: [
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
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: inProject('schema.gql')
    }),
    MailerModule,
    RecaptchaModule,
    AuthModule,
    TodosModule,
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
