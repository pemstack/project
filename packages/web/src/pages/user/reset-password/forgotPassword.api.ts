import { Action, Query } from 'app'
import * as yup from 'yup'

export const initiatePasswordResetSchema = yup.object({
  email: yup.string().email().required()
})

type InitiatePasswordResetParams = yup.InferType<typeof initiatePasswordResetSchema>

export const INITIATE_PASSWORD_RESET: Action<InitiatePasswordResetParams> = {
  schema: initiatePasswordResetSchema,
  perform({ email }, app) {
    return app
      .req('/api/users/password/reset')
      .post({ email })
      .res()
  }
}

export interface GetResetPasswordTokenStateResult {
  valid: boolean
  email: string | null
}

export interface GetResetPasswordTokenStateParams {
  resetToken: string
}

export const GET_RESET_PASSWORD_TOKEN_STATE: Query<GetResetPasswordTokenStateResult, GetResetPasswordTokenStateParams> = {
  resource: ({ resetToken }) => `tokens/reset-password/${resetToken}`,
  cache: 10,
  async fetch({ resetToken }, app) {
    return app
      .req(`/api/users/password/reset/${resetToken}`)
      .get()
      .json()
  }
}

export const resetPasswordSchema = yup.object({
  resetToken: yup
    .string()
    .required(),
  newPassword: yup
    .string()
    .required('user.error.password.required')
    .min(6, 'user.error.password.min')
    .matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/, 'user.error.password.invalid')
})

type ResetPasswordParams = yup.InferType<typeof resetPasswordSchema>

export const RESET_PASSWORD: Action<ResetPasswordParams> = {
  schema: resetPasswordSchema,
  perform({ resetToken, newPassword }, app) {
    return app
      .req(`/api/users/password/reset/${resetToken}`)
      .patch({ newPassword })
      .res()
  }
}
