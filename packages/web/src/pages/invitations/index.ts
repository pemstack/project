import { view, authorize } from 'app'
import { InvitationsRoute } from './InvitationsRoute'


export default authorize({
  action: view(InvitationsRoute)
})
