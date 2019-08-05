import { Query, Action } from 'app'
import { LoginParams, TokenResponse, loginSchema } from 'stores/user.store'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum UserStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

export interface UserInfo {
  id: string
  firstname: string
  lastname: string
  email: string
  roles: UserRole[]
  status: UserStatus
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

export type LoginParams = LoginParams
export type TokenResponse = TokenResponse

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
