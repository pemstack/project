import { PrimaryColumn, Column, Entity, CreateDateColumn, ManyToOne, JoinColumn, IsNull } from 'typeorm'
import { IsEnum } from 'class-validator'
import { Course } from './courses.entity'

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

  @Column({ nullable: true })
  group: string

  @IsEnum(InvitationStatus)
  @Column()
  status: InvitationStatus
}
