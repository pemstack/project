export interface RecaptchaResponse {
  success: boolean
  score: number
  action: string
  challengeTimestamp: number
  hostname: string
  errorCodes: string[]
}
