import { view, RoutingTable, lazy } from 'app'
import { RegisterRoute } from './RegisterRoute'

const routes: RoutingTable = {
  '/': lazy(() => import('./RegisterRoute')),
  '/success/:resendToken': lazy(() => import('./RegisterSuccessRoute')),
  '/confirm/:confirmToken': lazy(() => import('./ConfirmEmailRoute'))
}

export default { routes }
