/* eslint-disable eqeqeq */

import { Action } from '@pema/state'
import { App, isErrorCode } from 'app'
import wretch from 'wretch'
import * as yup from 'yup'

const api = wretch('/api/auth')

export interface TokenResponse {
  access_token: string
  session_id: string
  persist: boolean
}

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  persist: yup.boolean().notRequired()
})

const tokenSchema = yup.object({
  persist: yup.boolean().notRequired()
})

export type LoginParams = yup.InferType<typeof loginSchema>
export type TokenParams = yup.InferType<typeof tokenSchema>

const LOGIN: Action<LoginParams, TokenResponse> = {
  schema: loginSchema,
  async perform(params: LoginParams) {
    return await api.url('/login').post(params).json()
  }
}

const TOKEN: Action<TokenParams, TokenResponse> = {
  schema: tokenSchema,
  async perform(params: LoginParams) {
    return await api.url('/token').post(params).json()
  }
}

const SYNCHRONIZE_INTERVAL = 10

export class UserStore {
  private readonly app: App

  private intervalId: any
  private tokens: TokenResponse | null

  private setInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.intervalId = setInterval(() => {
      this.synchronize()
    }, SYNCHRONIZE_INTERVAL * 1000)
  }

  private getSessionId() {
    return this.app.cookies.get('session_id')
  }

  constructor(state: any, app: App) {
    this.app = app
    this.tokens = null
    this.setInterval()
  }

  get authenticated() {
    return !!this.tokens
  }

  get accessToken() {
    return this.tokens ? this.tokens.access_token : null
  }

  get sessionId() {
    return this.tokens ? this.tokens.session_id : null
  }

  async login(params: LoginParams) {
    const { apiClient } = this.app
    const tokens = await apiClient.action(LOGIN, params)
    this.tokens = tokens
    apiClient.invalidate('*', false)
    this.setInterval()
    return tokens
  }

  logout() {
    this.tokens = null
    const { cookies, apiClient } = this.app
    cookies.remove('session_id')
    apiClient.invalidate('*', false)
    this.setInterval()
  }

  synchronize() {
    const cached = this.sessionId
    const current = this.getSessionId()
    // tslint:disable-next-line: triple-equals
    if (cached != current) {
      this.app.apiClient.invalidate('*', false)
      // Session changed from other window
      document.location.reload()
      return true
    }

    return false
  }

  async refresh(synchronize = true, persist = true) {
    if (synchronize && this.synchronize()) {
      throw new Error()
    }

    if (!this.getSessionId()) {
      this.tokens = null
      return
    }

    try {
      const tokens = await this.app.apiClient.action(TOKEN, { persist })
      this.tokens = tokens
      this.setInterval()
      return tokens
    } catch (error) {
      if (isErrorCode(401, error)) {
        this.tokens = null
      } else {
        throw error
      }
    }
  }

  dispose() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}
