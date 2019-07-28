import { Query } from 'app'

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
