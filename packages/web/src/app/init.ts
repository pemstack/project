import { app, AppOptions } from '@pema/app'
import { withRouter, RoutingTable, HistoryBuildOptions } from '@pema/router'
import { CachedApiClient, ApiClient as IApiClient } from '@pema/state'
import { JObject } from '@pema/utils'
import { createBrowserHistory, History } from 'history'
import routes from 'routes'
import {
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

interface InitOptions {
  reload: (hardRefresh?: boolean) => void
  createHistory?: () => History
  historyProps?: AppOptions<HistoryBuildOptions>,
  ApiClient?: new (...args: any[]) => IApiClient
}

export function init(state: JObject, {
  reload,
  createHistory,
  historyProps,
  ApiClient
}: InitOptions): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createHistory || createBrowserHistory,
      routes: routes as RoutingTable,
      fallbackComputed: true,
      historyProps
    }))
    .extend({
      progress: ProgressStore,
      user: UserStore,
      cookies: CookiesStore,
      apiClient: ApiClient || CachedApiClient,
      session: SessionStore,
      recaptcha: RecaptchaStore,
      messages: MessagesStore
    })

  const request = baseWretcher(root as any)
  return root.mixin({
    req(url: string, context: RequestContext = {}) {
      return request
        .url(url)
        .options({ context })
    },
    reload(hardReload = true) {
      if (!this.disposed) {
        reload(hardReload)
      }
    }
  })
}
