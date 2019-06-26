import { AppNode } from '@pema/app'
import { ActionParams, Controller, Router, View as RouteView } from '@pema/router'
import { FunctionComponent } from 'react'

export interface App extends AppNode {
  router: Router
}

export type View<TProps = {}, TApp extends App = App>
  = FunctionComponent<ActionParams<TApp> & TProps> & RouteView<TApp>

export type Controller = Controller

export default 0
