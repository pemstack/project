import { authorize, view } from 'app'
import { ProfileView } from './profile.view'

export default authorize({
  action: view(ProfileView)
})
