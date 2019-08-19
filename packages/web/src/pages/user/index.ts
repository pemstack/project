import { lazy } from 'app'

export default {
  routes: {
    '/login': lazy(() => import('./login')),
    '/logout': lazy(() => import('./logout')),
    '/register': lazy(() => import('./register'))
  }
}
