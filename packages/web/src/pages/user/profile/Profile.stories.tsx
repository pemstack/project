import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, CenterContent } from 'app/mock'
import { Profile, ProfileItem } from './Profile'

const profile: ProfileItem = {
  id: '123',
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filan@example.com',
  roles: ['Student']
}

storiesOf('Profile', module)
  .addDecorator(decorator())
  .add('view only', () => (
    <CenterContent>
      <Profile item={profile} />
    </CenterContent>
  ))
