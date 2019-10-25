import { app, AppOptions } from '@pema/app'
import { withRouter, HistoryBuildOptions } from '@pema/router'
import { CachedApiClient, ApiClient as IApiClient } from '@pema/state'
import { JObject } from '@pema/utils'
import { createBrowserHistory, History } from 'history'
import routes from 'pages'
import {
  ConfigStore,
  UserStore,
  ProgressStore,
  CookiesStore,
  SessionStore,
  RecaptchaStore,
  MessagesStore
} from 'stores'
import wretch from 'wretch'
import { App, RequestContext } from './types'
import { baseWretcher } from './utils'

wretch().errorType('json')

interface ISession {
  get(key: string): any
  remove(key: string): void
}

interface InitOptions {
  reload: (hardRefresh?: boolean) => void
  createHistory?: () => History
  historyProps?: AppOptions<HistoryBuildOptions>
  ApiClient?: new (...args: any[]) => IApiClient
  Session?: new (...args: any[]) => ISession
}

export function init(
  state: JObject,
  {
    reload,
    createHistory,
    historyProps,
    ApiClient,
    Session = CookiesStore
  }: InitOptions
): App {
  const root = app(state)
    .extend(
      withRouter({
        createHistory: createHistory || createBrowserHistory,
        routes: routes as any,
        fallbackComputed: true,
        historyProps
      })
    )
    .extend({
      progress: ProgressStore,
      user: UserStore,
      cookies: Session,
      apiClient: ApiClient || CachedApiClient,
      session: SessionStore,
      recaptcha: RecaptchaStore,
      messages: MessagesStore,
      config: ConfigStore
    })

  const request = baseWretcher(root as any)
  return root.mixin({
    req(url: string, context: RequestContext = {}) {
      return request.url(url).options({ context })
    },
    reload(hardReload = true) {
      if (!this.disposed) {
        reload(hardReload)
      }
    }
  })
}
