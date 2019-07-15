import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { JObject } from '@pema/utils'
import routes from 'app/routes'
import { App } from 'app/types'
import { createBrowserHistory } from 'history'
import { ProgressStore } from 'stores/progress.store'

export default function init(state: JObject): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createBrowserHistory,
      routes,
      fallbackComputed: true
    }))
    .extend({
      progress: ProgressStore
    })

  return root
}
