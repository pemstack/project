import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider, decorator, CenterContent, MockApi, delay } from 'app/mock'
import { Profile, ProfileItem } from './Profile'
import { ProfileView } from './profile.view'
import { ME, UserRole } from 'api/user.api'

const profile: ProfileItem = {
  id: '123',
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filan@example.com'
}

function mocks(api: MockApi) {
  api.withQuery(ME, async () => {
    await delay(5000)
    return {
      id: '123',
      firstName: 'Filan',
      lastName: 'Fisteku',
      email: 'filan@example.com',
      roles: [UserRole.ADMIN]
    }
  })
}

storiesOf('Profile', module)
  .addDecorator(decorator())
  .add('Profile', () => (
    <CenterContent>
      <Profile item={profile} />
    </CenterContent>
  ))
  .add('profile.view', () => (
    <AppProvider path='/user/profile' apiMocks={mocks}>
      {props => (
        <CenterContent>
          <ProfileView {...props} />
        </CenterContent>
      )}
    </AppProvider>
  ))
