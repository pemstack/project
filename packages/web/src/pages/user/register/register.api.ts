import { Action, Query } from 'app'
import * as yup from 'yup'

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('register.error.firstName.required')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'register.error.firstName.invalid'),
  lastName: yup
    .string()
    .required('register.error.lastName.required')
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'register.error.lastName.invalid'),
  email: yup
    .string()
    .required('register.error.email.required')
    .email('register.error.email.invalid'),
  password: yup
    .string()
    .required('register.error.password.required')
    .min(6, 'register.error.password.min')
    .matches(/^[A-Za-z0-9.,!@#$^&*()_-]+$/, 'register.error.password.invalid'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null as any], 'register.error.confirmPassword')
})

export type RegisterParams = yup.InferType<typeof registerSchema>

export interface RegisterResponse {
  // todo
}

export const REGISTER: Action<RegisterParams, RegisterResponse> = {
  schema: registerSchema,
  perform(params: RegisterParams, app) {
    return app
      .req('/api/users', { action: 'register' })
      .post(params)
      .json()
  }
}
