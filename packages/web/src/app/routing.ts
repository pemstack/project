import {
  delay as pemaDelay,
  Delayed,
  FallbackView,
  lazy as pemaLazy,
  RouteAction,
  RoutingTable
} from '@pema/router'
import { mapLazy } from '@pema/utils'
import { RouteParams } from 'app/types'

export {
  allow,
  deny,
  controller,
  error,
  redirect,
  view
} from '@pema/router'

export function lazy(
  resolver: () => Promise<{ default: RouteAction }>,
  fallback: FallbackView = true) {
  return pemaLazy(mapLazy(resolver, v => v.default), fallback)
}

export function delay<T, TProps extends RouteParams = RouteParams>
  (delayed: Delayed<T, TProps>, fallback: FallbackView = true) {
  return pemaDelay<T, TProps>(delayed, fallback)
}

export type RoutingTable = RoutingTable
