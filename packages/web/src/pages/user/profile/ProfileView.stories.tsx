import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, CenterContent } from 'app/mock'
import { ProfileView, ProfileViewItem } from './ProfileView'

const profile: ProfileViewItem = {
  id: '123',
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filan@example.com'
}

storiesOf('user/profile/ProfileView', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent>
      <ProfileView item={profile} />
    </CenterContent>
  ))
