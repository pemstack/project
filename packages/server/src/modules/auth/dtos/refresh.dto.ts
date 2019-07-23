import { ApiModelProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshDto {
  @ApiModelProperty()
  @IsString()
  // tslint:disable-next-line: variable-name
  refresh_token: string
}
