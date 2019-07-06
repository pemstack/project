import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsEmail, IsEnum, IsString } from 'class-validator'

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
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column() @IsString()
  public firstname: string

  @Column() @IsString()
  public lastname: string

  @Column() @IsEmail()
  public email: string

  @Column() @IsString()
  public password: string

  @Column() @IsEnum(UserRole)
  public role: UserRole

  @Column() @IsEnum(UserStatus)
  public status: UserStatus
}
