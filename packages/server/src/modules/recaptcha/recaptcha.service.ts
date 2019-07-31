import { Injectable } from '@nestjs/common'
import recaptchaConfig from './recaptcha.config'
import { RecaptchaResponse } from './recaptcha.interface'
import wretch from 'wretch'

const { secretKey, verifyUrl } = recaptchaConfig

@Injectable()
export class RecaptchaService {
  async verify(token: string, remoteip?: string): Promise<RecaptchaResponse> {
    const response = await wretch(verifyUrl)
      .query({
        secret: secretKey,
        response: token,
        remoteip
      })
      .post()
      .json()

    return {
      success: response.success,
      score: response.score,
      action: response.action,
      challengeTimestamp: Date.parse(response.challenge_ts),
      hostname: response.hostname,
      errorCodes: response['error-codes'] || []
    }
  }
}
