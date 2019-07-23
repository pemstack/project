import { UserStore as IUserStore } from '@my-app/presentation'

export class UserStore implements IUserStore {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
}
