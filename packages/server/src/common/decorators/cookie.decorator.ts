import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const Cookie = createParamDecorator((key: string, req: Request) => {
  if (key) {
    return req.cookies ? req.cookies[key] as string : null
  } else {
    return req.cookies || {}
  }
})
