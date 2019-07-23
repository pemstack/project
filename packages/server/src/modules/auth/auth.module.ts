import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'modules/users'
import authConfig from './auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RolesGuard } from './guards'
import { JwtStrategy, LocalStrategy } from './strategies'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false
    }),
    JwtModule.register({
      secret: authConfig.jwtSecret,
      signOptions: { expiresIn: '15m' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieParserMiddleware)
      .forRoutes(AuthController)
  }
}
