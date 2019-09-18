import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param
} from '@nestjs/common'
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
import { InvitationsService } from './invitations.service'
import { Authorize, ReqUser } from 'common/decorators'
import { GetUserInvitationsResponse, CreateInvitationRequest, UpdateInvitationRequest } from './invitations.dto'
import { UsersService, User } from 'modules/users'
import { CoursesService } from 'modules/courses'

@ApiUseTags('invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitations: InvitationsService,
    private readonly users: UsersService,
    private readonly courses: CoursesService
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
  @Post(':courseid')
  async createInvitation(
    @ReqUser('userId') requesterUserId: string,
    @Param('courseid') courseId: string,
    @Body() { userEmail, permission }: CreateInvitationRequest
  ) {
    await this.invitations.createInvitation({
      requesterUserId,
      userEmail,
      courseId,
      permission
    })
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
