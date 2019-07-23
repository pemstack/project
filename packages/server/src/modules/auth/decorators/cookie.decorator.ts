import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const Cookie = createParamDecorator((key: string, req: Request) => {
  if (key) {
    return req.cookies[key] as string
  } else {
    return req.cookies
  }
})
