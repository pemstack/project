import { app } from '@pema/app'
import { withRouter } from '@pema/router'
import { JObject } from '@pema/utils'
import { createBrowserHistory } from 'history'
import routes from './routes'
import { App } from './types'

export default function init(state: JObject): App {
  const root = app(state)
    .extend(withRouter({
      createHistory: createBrowserHistory,
      routes
    }))

  return root
}
