import { ApiResponseModelProperty } from '@nestjs/swagger'

export class TokenResponse {
  @ApiResponseModelProperty()
  // tslint:disable-next-line: variable-name
  access_token: string

  @ApiResponseModelProperty()
  // tslint:disable-next-line: variable-name
  session_id: string

  @ApiResponseModelProperty()
  persist: boolean
}
