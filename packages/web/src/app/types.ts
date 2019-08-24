import { AppExtension, AppNode, Services } from '@pema/app'
import {
  ActionParams,
  Controller as RouteController,
  Router,
  View as RouteView,
  PickActionParams,
  OmitActionParams
} from '@pema/router'
import { ApiClient, Action as PemaAction, Query as PemaQuery, QueryOptions } from '@pema/state'
import { JValue } from '@pema/utils'
import { UserLayoutProps } from 'app/layout/UserLayout'
import { AnonymousLayoutProps } from 'app/layout/AnonymousLayout'
import { ComponentType } from 'react'
import {
  UserStore,
  ProgressStore,
  CookiesStore,
  SessionStore,
  RecaptchaStore,
  MessagesStore
} from 'stores'
import { Wretcher } from 'wretch'

export interface App extends AppNode {
  router: Router
  progress: ProgressStore
  user: UserStore
  cookies: CookiesStore
  session: SessionStore
  apiClient: ApiClient
  recaptcha: RecaptchaStore
  messages: MessagesStore
  reload(hardReload?: boolean): void
  req(url: string, context?: RequestContext): Wretcher
  query<TResult>(query: Query<TResult>, options?: QueryOptions): Promise<TResult>
}

export interface RequestContext {
  action?: string
  auth?: boolean
}

export
  interface RouteParams<TApp extends App = App>
  extends ActionParams<TApp> { }

type StringOrProps<TType extends string, TProps extends {} = {}> =
  | TType
  | TProps & { type: TType }

type LayoutType =
  | StringOrProps<'user', UserLayoutProps>
  | StringOrProps<'anonymous', AnonymousLayoutProps>
  | StringOrProps<'none'>
  | null

export type LayoutPicker<TProps extends RouteParams = RouteParams> =
  | LayoutType
  | ((params: PickActionParams<TProps>) => LayoutType)

interface LayoutRouteView<TProps extends RouteParams> extends RouteView<TProps> {
  deriveProps?: (params: PickActionParams<TProps>) => Partial<OmitActionParams<TProps>>
  layout?: LayoutPicker<TProps>
}

export type ExtendedApp<TExtension extends AppExtension = {}>
  = App & Services<TExtension>

interface WithStateProps<TParams extends RouteParams> {
  state: {
    props?: OmitActionParams<TParams>
  }
}

type ViewProps<TProps> =
  & RouteParams
  & TProps
  & WithStateProps<RouteParams & TProps>

export type View<TProps = {}> =
  & ComponentType<ViewProps<TProps>>
  & LayoutRouteView<ViewProps<TProps>>

export
  interface Controller<TProps = {}>
  extends RouteController<TProps & RouteParams> { }

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

export interface Action<TParams = void, TResult = void, TApp = App>
  extends PemaAction<TParams, TResult, TApp> { }

export interface Query<TResult, TParams = void, TApp = App>
  extends PemaQuery<TResult, TParams, TApp> { }

export default 0
