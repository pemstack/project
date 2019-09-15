import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ProfileView, ProfileViewItem } from './ProfileView'
import { CenterContent } from 'components'

const profile: ProfileViewItem = {
  userId: '123',
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
