import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'
import { CoursePermission, CoursePage, Course } from './courses.entity'
import { UsersModule } from 'modules/users'
import { InvitationsController } from './invitations.controller'
import { Invitation } from './invitations.entity'
import { InvitationsService } from './invitations.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CoursePermission, CoursePage, Invitation]),
    UsersModule
  ],
  providers: [CoursesService, InvitationsService],
  controllers: [CoursesController, InvitationsController],
  exports: [CoursesService]
})
export class CoursesModule { }
