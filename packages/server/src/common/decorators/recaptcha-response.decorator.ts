import { createParamDecorator } from '@nestjs/common'

export const RecaptchaResponse = createParamDecorator((data, req) => {
  if (!req.recaptcha) {
    return null
  }

  if (data) {
    return req.recaptcha[data]
  } else {
    return req.recaptcha
  }
})
