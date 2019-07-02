import { AppExtension, AppNode, Services } from '@pema/app'
import { ActionParams, Controller as RouteController, Router, View as RouteView } from '@pema/router'
import { JValue } from '@pema/utils'
import { DefaultLayoutProps } from 'app/layout/DefaultLayout'
import { ComponentType } from 'react'

export interface App extends AppNode {
  router: Router
}

export
  interface RouteProps<TApp extends App = App>
  extends ActionParams<TApp> { }

type StringOrProps<TType extends string, TProps extends {} = {}> =
  | TType
  | TProps & { type: TType }

type LayoutType =
  | StringOrProps<'default', DefaultLayoutProps>
  | StringOrProps<'none'>
  | null

export type LayoutPicker<TProps extends RouteProps = RouteProps> =
  | LayoutType
  | ((props: TProps) => LayoutType)

interface LayoutRouteView<TProps extends RouteProps> extends RouteView<TProps> {
  layout?: LayoutPicker<TProps>
}

export type View<TProps = {}> =
  ComponentType<RouteProps & TProps> & LayoutRouteView<RouteProps & TProps>

export type PropsOf<TView> =
  TView extends LayoutRouteView<infer TProps> ? TProps : RouteProps

export
  interface Controller<TProps extends RouteProps = RouteProps>
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
