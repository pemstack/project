import { RoutingTable, lazy } from 'app'

const routes: RoutingTable = {
  '/': lazy(() => import('./RegisterRoute')),
  '/success/:resendToken': lazy(() => import('./RegisterSuccessRoute')),
  '/confirm/:registerToken': lazy(() => import('./ConfirmEmailRoute'))
}

export default { routes }
