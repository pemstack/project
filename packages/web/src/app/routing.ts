import {
  allow,
  AnyAction,
  delay as pemaDelay,
  Delayed,
  DelayedResult,
  deny,
  FallbackView,
  lazy as pemaLazy,
  Path,
  redirect,
  RouteAction,
  RoutingTable
} from '@pema/router'
import { mapLazy } from '@pema/utils'
import { ME, UserRole } from 'api/user.api'
import { RouteParams } from './types'

export { allow, controller, deny, error, redirect, view } from '@pema/router'

type DelayableAction<TAction, TParams extends RouteParams = RouteParams>
  = TAction | DelayedResult<TAction, TParams>

export type RoutingTable<TParams extends RouteParams = RouteParams>
  = RoutingTable<TParams>

export function lazy(
  resolver: () => Promise<{ default: DelayableAction<AnyAction> }>,
  fallback: FallbackView = true) {
  return pemaLazy(mapLazy(resolver, v => v.default), fallback)
}

export function delay<T, TParams extends RouteParams = RouteParams>
  (delayed: Delayed<T, TParams>, fallback: FallbackView = true) {
  return pemaDelay<T, TParams>(delayed, fallback)
}

export function hardRedirect(to: Path) {
  return delay(({ app: { router } }) => router.navigate(to))
}

export interface AuthorizeOptions {
  roles?: string | string[]
  loginPath?: string
  action?: RouteAction
}

export function authorize({
  roles,
  loginPath = '/',
  action = allow()
}: AuthorizeOptions = {}) {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return delay(async ({
    app: { user, apiClient },
    href
  }) => {
    if (!user.authenticated) {
      return redirect({
        path: loginPath,
        query: {
          redirect: href || '/'
        }
      })
    }

    if (typeof roles === 'undefined') {
      return action
    }

    const userInfo = await apiClient.query(ME)
    if (!userInfo) {
      return deny()
    }

    const userRoles = userInfo.roles || []
    if ((roles as string[]).some(r => userRoles.includes(r as UserRole))) {
      return action
    } else {
      return deny()
    }
  })
}
