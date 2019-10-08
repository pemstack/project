import { RoutingTable, lazy } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./ForgotPasswordRoute')),
  '/sent': lazy(() => import('./ForgotPasswordSuccessRoute')),
  '/:resetToken': lazy(() => import('./ResetPasswordRoute'))
}

export default { routes }
