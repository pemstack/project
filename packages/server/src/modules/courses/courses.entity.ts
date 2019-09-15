import { PrimaryColumn, Column, ManyToOne, OneToMany, Entity, JoinColumn } from 'typeorm'
import { User } from 'modules/users'
import { IsEnum } from 'class-validator'

export enum CourseAccess {
  Private = 'private',
  Public = 'public'
}

@Entity()
export class Course {
  @PrimaryColumn()
  courseId: string

  @Column()
  title: string

  @Column()
  ownerId: string

  @ManyToOne(type => User, user => user.ownedCourses, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User

  @IsEnum(CourseAccess)
  @Column()
  access: CourseAccess

  @OneToMany(type => CoursePage, coursePage => coursePage.course)
  pages: CoursePage[]

  @OneToMany(type => CoursePermission, coursePermission => coursePermission.course)
  permission: CoursePermission[]
}

export enum CoursePermissionLevel {
  None = 'none',
  Read = 'read',
  Write = 'write'
}

@Entity()
export class CoursePermission {
  @PrimaryColumn()
  userId: string

  @ManyToOne(type => Course, course => course.pages, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId' })
  user: User

  @PrimaryColumn()
  courseId: string

  @ManyToOne(type => Course, course => course.permission, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'courseId' })
  course: Course

  @Column()
  role: string

  @IsEnum(CoursePermissionLevel)
  @Column()
  permissionLevel: CoursePermissionLevel
}

export enum PageAccess {
  Private = 'private',
  Public = 'public',
  Unlisted = 'unlisted'
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
  @JoinColumn({ name: 'courseId' })
  course: Course

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @IsEnum(PageAccess)
  @Column()
  access: PageAccess
}
