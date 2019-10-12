import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger'
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

export class UpdateInvitationRequest {
  @ApiModelProperty()
  accepted: boolean
}
