import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional } from 'class-validator'
import { Invitation, InvitationStatus } from './invitations.entity'
import { CoursePermissionLevel } from './courses.entity'

export class GetUserInvitationsResponse {
  @ApiResponseModelProperty()
  courseId: string

  @ApiResponseModelProperty()
  courseTitle: string

  @ApiResponseModelProperty()
  permission: CoursePermissionLevel

  @ApiResponseModelProperty()
  dateInvited: Date
}

export class CreateInvitationRequest {
  @ApiModelProperty()
  userEmail: string

  @ApiModelProperty()
  permission: CoursePermissionLevel
}

export class UpdateInvitationRequest {
  @ApiModelProperty()
  accepted: boolean
}
