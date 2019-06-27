import { AppExtension, AppNode, Services } from '@pema/app'
import { ActionParams, Controller as RouteController, Router, View as RouteView } from '@pema/router'
import { JValue } from '@pema/utils'
import { FunctionComponent } from 'react'

export interface App extends AppNode {
  router: Router
}

export
  interface RouteProps<TApp extends App = App>
  extends ActionParams<TApp> { }

export type View<TProps extends RouteProps = RouteProps> =
  FunctionComponent<TProps> & RouteView<TProps>

export
  interface Controller<TProps extends RouteProps = RouteProps>
  extends RouteController<TProps> { }

export type WithController<TController extends Controller> =
  RouteProps & { readonly controller: TController }

export type WithApp<TApp extends App> =
  RouteProps & { readonly app: TApp }

export type WithAppExtension<TExtension extends AppExtension> =
  RouteProps & { readonly app: Services<TExtension> }

export type WithState<TState extends { [TKey in keyof TState]: JValue }> =
  RouteProps & { readonly state: TState }

export type WithSession<TSession extends { [TKey in keyof TSession]: JValue }> =
  RouteProps & { readonly session: TSession }

export default 0
