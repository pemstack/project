import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional } from 'class-validator'
import { Invitation, CoursePermissionLevel, InvitationStatus } from './invitations.entity'

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
