import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const ReqLang = createParamDecorator((data, req: Request) => {
  if (!req.cookies) {
    return 'en'
  }

  const lang = req.cookies.lang as string || 'en'
  if (['en', 'sq'].includes(lang)) {
    return lang
  } else {
    return lang
  }
})
