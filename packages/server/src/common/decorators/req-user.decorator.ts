import { createParamDecorator } from '@nestjs/common'

export const ReqUser = createParamDecorator((data, req) => {
  return data ? req.user && req.user[data] : req.user
})
