import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { JObject } from '@pema/utils'
import routes from 'app/routes'
import { App } from 'app/types'
import { createBrowserHistory } from 'history'

export default function init(state: JObject): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createBrowserHistory,
      routes
    }))

  return root
}
