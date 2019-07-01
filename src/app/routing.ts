import {
  ControllerConstructor,
  ControllerResult,
  delay as pemaDelay,
  Delayed,
  lazy,
  LazyResult,
  RoutingTable
} from '@pema/router'
import { mapLazy } from '@pema/utils'
import Loading from 'app/components/Loading'
import { RouteProps } from 'app/types'

export { redirect, view, controller, lazy, allow, deny, error } from '@pema/router'

export function lazyView<T>(resolver: () => Promise<{ default: T }>) {
  return lazy.view(mapLazy(resolver, v => v.default), Loading)
}

export function lazyController
  (resolver: () => Promise<{ default: ControllerConstructor }>): LazyResult<ControllerResult> {
  return lazy.controller(mapLazy(resolver, v => v.default), Loading)
}

export function delay<T, TProps extends RouteProps = RouteProps>(delayed: Delayed<T, TProps>) {
  return pemaDelay<T, TProps>(delayed, Loading)
}

export type RoutingTable = RoutingTable
