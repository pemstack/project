import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'
import { CoursePermission, CoursePage, Course } from './courses.entity'
import { UsersModule } from 'modules/users'
import { InvitationsController } from './invitations.controller'
import { Invitation } from './invitations.entity'
import { InvitationsService } from './invitations.service'
import { MulterModule } from '@nestjs/platform-express'
import { inProject } from 'globals'
import { diskStorage } from 'multer'
import { existsSync, mkdirSync } from 'fs'
import uniqid from 'uniqid'
import { extname } from 'path'

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CoursePermission, CoursePage, Invitation]),
    UsersModule,
    MulterModule.register({
      dest: inProject('data/uploads'),
      limits: {
        // fileSize:
      }
    })
  ],
  providers: [CoursesService, InvitationsService],
  controllers: [CoursesController, InvitationsController],
  exports: [CoursesService]
})
export class CoursesModule { }
