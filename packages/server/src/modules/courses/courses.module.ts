import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { inUploads } from 'globals'
import { AuthModule } from 'modules/auth'
import { UsersModule } from 'modules/users'
import { CoursesController } from './courses.controller'
import { Course, CoursePage, CoursePermission } from './courses.entity'
import { CoursesService } from './courses.service'
import { InvitationsController } from './invitations.controller'
import { Invitation } from './invitations.entity'
import { InvitationsService } from './invitations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CoursePermission, CoursePage, Invitation]),
    UsersModule,
    AuthModule,
    MulterModule.register({
      dest: inUploads(),
      limits: {
        // fileSize:
      }
    })
  ],
  providers: [CoursesService, InvitationsService],
  controllers: [CoursesController, InvitationsController],
  exports: [CoursesService]
})
export class CoursesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieParserMiddleware)
      .forRoutes(CoursesController)
  }
}
