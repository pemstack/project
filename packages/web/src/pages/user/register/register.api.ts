import { Action } from 'app'
import * as yup from 'yup'

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('user.error.firstName.required')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'user.error.firstName.invalid'),
  lastName: yup
    .string()
    .required('user.error.lastName.required')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'user.error.lastName.invalid'),
  email: yup
    .string()
    .required('user.error.email.required')
    .email('user.error.email.invalid'),
  password: yup
    .string()
    .required('user.error.password.required')
    .min(6, 'user.error.password.min')
    .matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/, 'user.error.password.invalid')
})

export type RegisterParams = yup.InferType<typeof registerSchema>

export interface RegisterResult {
  resendToken: string
}

export const REGISTER: Action<RegisterParams, RegisterResult> = {
  progress: true,
  schema: registerSchema,
  perform(params, app) {
    return app
      .req('/api/users/register', { action: 'register' })
      .post(params, { credentials: 'same-origin' })
      .json()
  }
}

export const resendConfirmEmailSchema = yup.object({
  resendToken: yup.string().required()
})

export type ResendConfirmEmailParams = yup.InferType<
  typeof resendConfirmEmailSchema
>

export const RESEND_CONFIRM_EMAIL: Action<ResendConfirmEmailParams> = {
  schema: resendConfirmEmailSchema,
  progress: true,
  perform(params, app) {
    return app
      .req('/api/users/register/resend')
      .post(params, { credentials: 'same-origin' })
      .json()
  }
}

export const confirmEmailSchema = yup.object({
  registerToken: yup.string().required()
})

export type ConfirmEmailParams = yup.InferType<typeof confirmEmailSchema>

export const CONFIRM_EMAIL: Action<ConfirmEmailParams> = {
  schema: confirmEmailSchema,
  progress: true,
  perform(params, app) {
    return app
      .req('/api/users/register/confirm')
      .post(params)
      .json()
  }
}
