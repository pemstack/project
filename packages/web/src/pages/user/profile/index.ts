import { authorize, view } from 'app'
import { ProfileRoute } from './ProfileRoute'

export default authorize({
  action: view(ProfileRoute)
})
