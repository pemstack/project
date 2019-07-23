import { ApiModelProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

export class TokenRequestDto {
  @ApiModelProperty({ required: false, default: true })
  @IsOptional() @IsBoolean()
  persist?: boolean = true
}
