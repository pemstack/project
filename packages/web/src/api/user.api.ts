import { Query, Action } from 'app'
import { TokenResponse } from 'stores/user.store'
import * as yup from 'yup'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface UserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: UserRole[]
}

export const ME: Query<UserInfo | null> = {
  resource: 'me',
  cache: true,
  async fetch(app) {
    if (!app.user.authenticated) {
      return null
    }

    return app
      .req('/api/auth/me')
      .get()
      .unauthorized(() => null)
      .json()
  }
}

export const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  persist: yup.boolean().notRequired()
})

export type LoginParams = yup.InferType<typeof loginSchema>

export const LOGIN: Action<LoginParams, TokenResponse> = {
  progress: true,
  schema: loginSchema,
  async perform(params, app) {
    return await app.user.login(params)
  }
}

export const LOGOUT: Action = {
  progress: true,
  async perform(params, app) {
    return await app.user.logout()
  }
}
