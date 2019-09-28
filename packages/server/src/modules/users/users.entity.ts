import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm'
import { IsEmail, IsString, Matches, MinLength, IsEnum } from 'class-validator'

@Entity()
export class User {
  constructor(values: Partial<User> = {}) {
    Object.assign(this, values)
  }

  @PrimaryGeneratedColumn('uuid')
  userId: string

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
}

export enum TokenState {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}

@Entity()
export class UserRegistration {
  @PrimaryGeneratedColumn('uuid')
  registerToken: string

  @Column()
  resendToken: string

  @CreateDateColumn()
  dateCreated: Date

  @Column()
  email: string

  @Column({ type: 'simple-json' })
  userData: User

  @Column()
  @IsEnum(TokenState)
  state: TokenState = TokenState.Pending
}

@Entity()
export class PasswordReset {
  @PrimaryGeneratedColumn('uuid')
  resetToken: string

  @Column()
  resendToken: string

  @CreateDateColumn()
  dateCreated: Date

  @Column()
  email: string

  @Column()
  @IsEnum(TokenState)
  state: TokenState = TokenState.Pending

  @Column({ nullable: true })
  lastSent?: Date
}
