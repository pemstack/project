import { ApiResponseModelProperty } from '@nestjs/swagger'

export class TokenResponse {
  @ApiResponseModelProperty()
  accessToken: string

  @ApiResponseModelProperty()
  sessionId: string

  @ApiResponseModelProperty()
  persist: boolean
}
