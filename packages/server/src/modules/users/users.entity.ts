import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, IsEnum, IsString, ArrayUnique, Matches, MinLength } from 'class-validator'

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

  @Column({ type: 'simple-array' })
  @IsEnum(UserRole, { each: true })
  @ArrayUnique()
  roles: UserRole[] = [UserRole.USER]

  @Column()
  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.PENDING
}
