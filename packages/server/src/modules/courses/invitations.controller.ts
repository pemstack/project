import {
  Body,
  Controller,
  Get,
  Patch,
  Param
} from '@nestjs/common'
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
import { InvitationsService } from './invitations.service'
import { Authorize, ReqUser } from 'common/decorators'
import { GetUserInvitationsResponse, UpdateInvitationRequest } from './invitations.dto'
import { User } from 'modules/users'

@ApiUseTags('invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitations: InvitationsService
  ) { }

  @ApiResponse({ status: 200, type: [GetUserInvitationsResponse] })
  @ApiBearerAuth()
  @Authorize()
  @Get()
  async getUserInvitations(
    @ReqUser('email') userEmail: string
  ): Promise<GetUserInvitationsResponse[]> {
    const invitations = await this.invitations.getUserInvitations({ userEmail })
    return invitations.map(invitation => ({
      courseId: invitation.courseId,
      courseTitle: invitation.course.title,
      permission: invitation.permission,
      dateInvited: invitation.dateInvited
    }))
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Patch(':courseid')
  async updateInvitation(
    @ReqUser() user: User,
    @Param('courseid') courseId: string,
    @Body() { accepted }: UpdateInvitationRequest
  ) {
    return await this.invitations.updateInvitation({
      user,
      courseId,
      accepted
    })
  }
}
