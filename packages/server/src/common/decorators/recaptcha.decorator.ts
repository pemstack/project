import { SetMetadata } from '@nestjs/common'

export const Recaptcha = (action: string) => SetMetadata('recaptcha-action', action)
