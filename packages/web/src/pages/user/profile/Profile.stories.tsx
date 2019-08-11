import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
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
    <Profile item={profile} />
  ))
