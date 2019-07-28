import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { CachedApiClient, QueryOptions } from '@pema/state'
import { JObject } from '@pema/utils'
import { createBrowserHistory } from 'history'
import routes from 'routes'
import { UserStore, ProgressStore, CookiesStore, SessionStore } from 'stores'
import wretch from 'wretch'
import { App, Query } from './types'

wretch().errorType('json')

export function init(state: JObject, reload: (hardRefresh?: boolean) => void): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createBrowserHistory,
      routes,
      fallbackComputed: true
    }))
    .extend({
      progress: ProgressStore,
      user: UserStore,
      cookies: CookiesStore,
      apiClient: CachedApiClient,
      session: SessionStore
    })
    .mixin({
      req(url?: string) {
        const request = this.user.request
        return url ? request.url(url) : request
      },
      query(query: Query<any>, options?: QueryOptions) {
        return this.apiClient.query(query, options)
      },
      reload(hardReload = true) {
        if (!this.disposed) {
          reload(hardReload)
        }
      }
    })

  return root
}
