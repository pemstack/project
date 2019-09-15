import { createParamDecorator } from '@nestjs/common'

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? '' : ':3000'

export const ReqUrl = createParamDecorator((data, req) => {
  const url = req.protocol + '://' + req.get('host') + port
  if (isProd) {
    return url
  } else {
    return url.replace(':4000', '')
  }
})
