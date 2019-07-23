import { ApiResponseModelProperty } from '@nestjs/swagger'

export class TokenResponse {
  @ApiResponseModelProperty()
  // tslint:disable-next-line: variable-name
  access_token: string

  @ApiResponseModelProperty()
  persist?: boolean = true
}
