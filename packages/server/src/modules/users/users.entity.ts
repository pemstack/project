import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, IsEnum, IsString, ArrayUnique } from 'class-validator'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum UserStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

@Entity()
export class User {
  constructor(values: Partial<User> = {}) {
    Object.assign(this, values)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column() @IsString()
  firstname: string

  @Column() @IsString()
  lastname: string

  @Column() @IsEmail()
  email: string

  @Column() @IsString()
  password: string

  @Column({ type: 'simple-array' })
  @IsEnum(UserRole, { each: true })
  @ArrayUnique()
  roles: UserRole[] = [UserRole.USER]

  @Column({
    type: 'simple-enum',
    enum: UserStatus
  })
  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.PENDING
}
