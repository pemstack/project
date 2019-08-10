import { createParamDecorator } from '@nestjs/common'

export const ReqLang = createParamDecorator((data, req) => {
  const lang = req.cookies.lang as string || 'en'
  if (['en', 'sq'].includes(lang)) {
    return lang
  } else {
    return lang
  }
})
