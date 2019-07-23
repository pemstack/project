export interface ProgressStore {
  start(): void
  done(): void
  track<T>(delayed: Promise<T> | (() => Promise<T>)): Promise<T>
}

export interface UserStore {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
}
