import { PrimaryColumn, Column, ManyToOne, OneToMany, Entity } from 'typeorm'
import { User } from 'modules/users'
import { IsEnum } from 'class-validator'

@Entity()
export class Course {
  @PrimaryColumn()
  id: string

  @Column()
  title: string

  @Column()
  ownerId: string

  @ManyToOne(type => User, user => user.ownedCourses, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  owner: User

  @OneToMany(type => CoursePage, coursePage => coursePage.course)
  pages: CoursePage[]

  @OneToMany(type => CourseAccess, courseAccess => courseAccess.course)
  access: CourseAccess[]
}

export enum AccessLevel {
  None = 'none',
  Read = 'read',
  Write = 'write'
}

@Entity()
export class CourseAccess {
  @PrimaryColumn()
  userId: string

  @ManyToOne(type => Course, course => course.pages, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  user: User

  @PrimaryColumn()
  courseId: string

  @ManyToOne(type => Course, course => course.access, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  course: Course

  @Column()
  role: string

  @IsEnum(AccessLevel)
  @Column()
  access: AccessLevel
}

@Entity()
export class CoursePage {
  @PrimaryColumn()
  pageId: string

  @Column()
  courseId: string

  @ManyToOne(type => Course, course => course.pages, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  course: Course

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string
}
