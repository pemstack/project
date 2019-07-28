import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { CachedApiClient } from '@pema/state'
import { JObject } from '@pema/utils'
import { App } from 'app/types'
import { createBrowserHistory } from 'history'
import routes from 'routes'
import { UserStore, ProgressStore, CookiesStore, SessionStore } from 'stores'
import wretch from 'wretch'

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
      reload(hardReload = true) {
        if (!this.disposed) {
          reload(hardReload)
        }
      }
    })

  return root
}
