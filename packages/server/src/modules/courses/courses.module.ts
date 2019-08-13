import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoursesController } from './courses.controller'
import { CoursesService } from './courses.service'
import { CourseAccess, CoursePage, Course } from './courses.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseAccess, CoursePage])],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService]
})
export class CoursesModule { }
