import { lazy } from 'app'
import { MinimalLoading } from 'app/components'

export default {
  routes: {
    '/login': lazy(() => import('./login'), MinimalLoading),
    '/logout': lazy(() => import('./logout'), MinimalLoading),
    '/register': lazy(() => import('./register'), MinimalLoading),
    '/profile': lazy()
  }
}
