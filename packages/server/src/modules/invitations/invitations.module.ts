import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvitationsController } from './invitations.controller'
import { InvitationsService } from './invitations.service'
import { Invitations } from './invitations.entity'
import { CoursesModule } from 'modules/courses'
import { UsersModule } from 'modules/users'

@Module({
  imports: [TypeOrmModule.forFeature([Invitations]), CoursesModule, UsersModule],
  providers: [InvitationsService],
  controllers: [InvitationsController],
  exports: [InvitationsService]
})
export class InvitationsModule { }
