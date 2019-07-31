import { createParamDecorator } from '@nestjs/common'

export const RecaptchaScore = createParamDecorator((data, req) => {
  if (req.recaptcha && req.recaptcha.success) {
    return req.recaptcha.score as number
  } else {
    return null
  }
})
