import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { CourseAccess, Course } from 'modules/courses'

@Entity()
export class User {
  constructor(values: Partial<User> = {}) {
    Object.assign(this, values)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  firstName: string

  @Column()
  @IsString()
  @Matches(/^[A-Za-z]+( [A-Za-z]+)*$/)
  lastName: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  @IsString()
  @MinLength(6)
  @Matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/)
  password: string

  @Column({ type: 'simple-array', nullable: true })
  roles?: string[]

  @OneToMany(type => CourseAccess, access => access.user)
  access: CourseAccess[]

  @OneToMany(type => Course, course => course.owner)
  ownedCourses: Course[]
}
