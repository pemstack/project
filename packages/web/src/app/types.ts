import { AppExtension, AppNode, Services } from '@pema/app'
import {
  ActionParams,
  Controller as RouteController,
  Router,
  View as RouteView,
  PickActionParams,
  OmitActionParams
} from '@pema/router'
import { JValue } from '@pema/utils'
import { DefaultLayoutProps } from 'app/layout/DefaultLayout'
import { ComponentType } from 'react'

export interface App extends AppNode {
  router: Router
}

export
  interface RouteParams<TApp extends App = App>
  extends ActionParams<TApp> { }

type StringOrProps<TType extends string, TProps extends {} = {}> =
  | TType
  | TProps & { type: TType }

type LayoutType =
  | StringOrProps<'default', DefaultLayoutProps>
  | StringOrProps<'none'>
  | null

export type LayoutPicker<TProps extends RouteParams = RouteParams> =
  | LayoutType
  | ((props: TProps) => LayoutType)

interface LayoutRouteView<TProps extends RouteParams> extends RouteView<TProps> {
  deriveProps?: (params: PickActionParams<TProps>) => OmitActionParams<TProps>
  layout?: LayoutPicker<TProps>
}

export type View<TProps = {}> =
  ComponentType<RouteParams & TProps> & LayoutRouteView<RouteParams & TProps>

export
  interface Controller<TProps extends RouteParams = RouteParams>
  extends RouteController<TProps> { }

export interface WithController<TController extends Controller> {
  readonly controller: TController
}

export interface WithApp<TApp extends App> {
  readonly app: TApp
}

export interface WithAppExtension<TExtension extends AppExtension> {
  readonly app: Services<TExtension>
}

export interface WithState<TState extends { [TKey in keyof TState]: JValue | {} }> {
  readonly state: TState
}

export interface WithSession<TSession extends { [TKey in keyof TSession]: JValue | {} }> {
  readonly session: TSession
}

export default 0
