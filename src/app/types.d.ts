import { AppNode } from '@pema/app'
import { Router } from '@pema/router'

export interface App extends AppNode {
  router: Router
}
