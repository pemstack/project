import { PrimaryColumn, Column, Entity, CreateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { IsEnum } from 'class-validator'
import { Course, CourseGroup } from './courses.entity'

export enum InvitationStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Declined = 'declined'
}

enum CoursePermissionLevel {
  None = 'none',
  Read = 'read',
  Write = 'write'
}

@Entity()
export class Invitation {
  @PrimaryColumn()
  userEmail: string

  @PrimaryColumn()
  courseId: string

  @ManyToOne(type => Course, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'courseId' })
  course: Course

  @IsEnum(CoursePermissionLevel)
  @Column()
  permission: CoursePermissionLevel

  @CreateDateColumn()
  dateInvited: Date

  @ManyToMany(type => CourseGroup)
  @JoinTable()
  groups: CourseGroup[]

  @IsEnum(InvitationStatus)
  @Column()
  status: InvitationStatus
}

// @Entity()
// export class InvitationGroup {
//   @PrimaryColumn()
//   userEmail: string

//   @PrimaryColumn()
//   courseId: string

//   @PrimaryColumn()
//   groupName: string

//   @ManyToOne(type => Invitation, {
//     primary: true,
//     nullable: false,
//     onDelete: 'CASCADE'
//   })``

//   @JoinColumn([
//     { name: 'courseId', referencedColumnName: 'courseId' },
//     { name: 'pageId', referencedColumnName: 'pageId' }
//   ])
//   invitation: Course
// }
