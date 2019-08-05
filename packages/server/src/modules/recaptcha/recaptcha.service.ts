import { Injectable } from '@nestjs/common'
import { RecaptchaResponse } from './recaptcha.interface'
import wretch from 'wretch'
import { ConfigService } from 'nestjs-config'

@Injectable()
export class RecaptchaService {
  private readonly secretKey: string
  private readonly verifyUrl: string

  constructor(config: ConfigService) {
    this.secretKey = config.get('recaptcha.secretKey')
    this.verifyUrl = config.get('recaptcha.verifyUrl')
  }

  async verify(token: string, remoteip?: string): Promise<RecaptchaResponse> {
    const { secretKey, verifyUrl } = this
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
