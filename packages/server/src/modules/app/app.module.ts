import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { inProject, inSrc } from 'globals'
import { AuthModule } from 'modules/auth'
import { TodosModule } from 'modules/todos'
import { RecaptchaModule, RecaptchaGuard } from 'modules/recaptcha'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter'

@Module({
  imports: [
    ConfigModule.load(
      inSrc('**/!(*.d.ts).config.{ts,js}'),
      {
        modifyConfigName: name => name.replace('.config', ''),
        path: inProject()
      }
    ),
    RateLimiterModule.register({
      points: 50,
      duration: 5,
      type: 'Memory'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: inProject('schema.gql')
    }),
    RecaptchaModule,
    AuthModule,
    TodosModule
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
