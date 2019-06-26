import {
  ControllerConstructor,
  delay as pemaDelay,
  Delayed,
  lazy,
  RoutingTable
} from '@pema/router'
import { mapLazy } from '@pema/utils'
import Loading from './components/Loading'

export { redirect, view, controller, lazy, allow, deny, error } from '@pema/router'

export function lazyView<T>(resolver: () => Promise<{ default: T }>) {
  return lazy.view(mapLazy(resolver, v => v.default), Loading)
}

export function lazyController<T extends ControllerConstructor>(resolver: () => Promise<{ default: T }>) {
  return lazy.controller(mapLazy(resolver, v => v.default), Loading)
}

export function delay<T>(delayed: Delayed<T>) {
  return pemaDelay(delayed, Loading)
}

export type RoutingTable = RoutingTable
