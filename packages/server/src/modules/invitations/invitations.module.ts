import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvitationsController } from './invitations.controller'
import { InvitationsService } from './invitations.service'
import { } from './invitations.entity'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [InvitationsService],
  controllers: [InvitationsController],
  exports: [InvitationsService]
})
export class CoursesModule { }
