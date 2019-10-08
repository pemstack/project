import { JObject, Dictionary } from '@pema/utils'
import { App, RequestContext, Query } from './types'
import wretch from 'wretch'
import { useApp } from '@pema/app-react'
import { MessagesStore } from 'stores'
import { useQuery } from '@pema/state-react'

/* eslint-disable eqeqeq */

export function useMessages(): MessagesStore {
  const app = useApp<App>()
  return app.messages
}

export function createQueryHook<TResult, TParams>
  (query: Query<TResult, TParams>): TResult extends void
  ? (() => TResult)
  : ((params: TParams) => TResult) {
  return function useMemoQuery(params: TParams) {
    return useQuery(query, params).read()
  } as any
}

export function errorCode(error: any) {
  if (!error) {
    return 500
  }

  if (error.status) {
    return error.status
  }

  if (error.statusCode) {
    return error.statusCode
  }

  return 500
}

export function isErrorCode(code: number | string, error: any): boolean {
  // tslint:disable-next-line: triple-equals
  return errorCode(error) == code
}

export function stringParam<TDefault>
  (obj: JObject, key: string, defaultValue: TDefault): string | TDefault {
  const val = obj[key]
  if (typeof val === 'string') {
    return val
  } else {
    return defaultValue
  }
}

export function asInt(expr: any, defaultValue: number): number {
  const parsed = typeof expr === 'string' ? parseInt(expr) : expr
  return isNaN(parsed) || typeof parsed !== 'number' ? defaultValue : parsed
}

export function viewInvariant(condition: any, code: number, message?: string) {
  if (!condition) {
    const error = new Error(message);
    (error as any).statusCode = code
    throw error
  }
}

export function baseWretcher(app: App) {
  return wretch()
    .options({ credentials: 'omit' })
    .middlewares([next => async (url, opts) => {
      const {
        context = {},
        ...options
      } = opts as { context: RequestContext, [key: string]: any }

      const { action, auth = true } = context
      let tokenPromise: Promise<string | null> | undefined
      if (auth) {
        tokenPromise = app.user.getAccessToken()
      }

      const headers = {} as Dictionary

      if (typeof action === 'string') {
        const captchaToken = await app.recaptcha.token(action)
        if (captchaToken) {
          headers['Captcha-Token'] = captchaToken
        }
      }

      if (auth) {
        const token = await tokenPromise
        if (token) {
          headers.Authorization = 'Bearer ' + token
        }
      }

      return next(url, {
        ...options,
        headers: {
          ...options.headers || {},
          ...headers
        }
      })
    }])
    .catcher(401, async (error, request) => {
      const { context = {} } = request._options
      if ((context as RequestContext).auth === false || !app.user.authenticated) {
        throw error
      }

      const token = await app.user.getAccessToken(true)
      if (!token) {
        throw error
      }

      return request
        .auth('Bearer ' + token)
        .replay()
        .unauthorized(err => { throw err })
        .json()
    })
}
