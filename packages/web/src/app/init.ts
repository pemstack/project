import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { CachedApiClient } from '@pema/state'
import { JObject } from '@pema/utils'
import { App } from 'app/types'
import { createBrowserHistory } from 'history'
import routes from 'routes'
import { ProgressStore } from 'stores/progress.store'

export default function init(state: JObject): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createBrowserHistory,
      routes,
      fallbackComputed: true
    }))
    .extend({
      apiClient: CachedApiClient,
      progress: ProgressStore
    })

  return root
}
