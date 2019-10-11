import { Module, MiddlewareConsumer } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'
import { CoursePermission, CoursePage, Course } from './courses.entity'
import { UsersModule } from 'modules/users'
import { AuthModule } from 'modules/auth'
import { InvitationsController } from './invitations.controller'
import { Invitation } from './invitations.entity'
import { InvitationsService } from './invitations.service'
import { MulterModule } from '@nestjs/platform-express'
import { inProject, inUploads } from 'globals'
import { diskStorage } from 'multer'
import { existsSync, mkdirSync } from 'fs'
import uniqid from 'uniqid'
import { extname } from 'path'
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser'

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
