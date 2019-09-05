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
    .email('register.error.email.invalid'),
  password: yup
    .string()
    .required('user.error.password.required')
    .min(6, 'user.error.password.min')
    .matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/, 'user.error.password.invalid')
})

export type RegisterParams = yup.InferType<typeof registerSchema>

export interface RegisterResponse {
  // todo
}

export const REGISTER: Action<RegisterParams, RegisterResponse> = {
  progress: true,
  schema: registerSchema,
  perform(params: RegisterParams, app) {
    return app
      .req('/api/users', { action: 'register' })
      .post(params, { credentials: 'same-origin' })
      .json()
  }
}
