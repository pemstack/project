import {
  Body,
  Controller,
  Post,
  Get,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Patch,
  Param
} from '@nestjs/common'
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger'
import { InvitationsService } from './invitations.service'
import { Authorize, ReqUser } from 'common/decorators'
import { GetUserInvitationsResponse, CreateInvitationRequest, UpdateInvitationRequest } from './invitations.dto'
import { UsersService, User } from 'modules/users'
import { CoursesService, CoursePermissionLevel } from 'modules/courses'

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
    @ReqUser('userId') userId: string
  ): Promise<GetUserInvitationsResponse[]> {
    const user = await this.users.findOne({ userId })

    if (!user) {
      throw new NotFoundException()
    }

    return await this.invitations.getUserInvitations({ userEmail: user.email })
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Authorize()
  @Post()
  async createInvitation(
    @ReqUser('userId') requesterUserId: string,
    @Body() { userEmail, courseId, permission }: CreateInvitationRequest
  ) {
    const coursePermission = await this.courses.tryGetCoursePermission({ courseId, userId: requesterUserId })

    if (!coursePermission) {
      throw new NotFoundException()
    }

    if (coursePermission.permissionLevel !== CoursePermissionLevel.Write) {
      throw new ForbiddenException()
    }

    const exists = await this.invitations.getInvitation({ userEmail, courseId })
    if (exists) {
      throw new BadRequestException('Invitation has already been made.')
    }

    return await this.invitations.createInvitation({ userEmail, courseId, permission })
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
