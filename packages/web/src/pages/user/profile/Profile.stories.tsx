import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider, decorator, CenterContent, MockApi, delay } from 'app/mock'
import { Profile, ProfileItem } from './Profile'
import { ProfileRoute } from './ProfileRoute'
import { GET_CURRENT_USER } from 'api/user.api'

const profile: ProfileItem = {
  id: '123',
  firstName: 'Filan',
  lastName: 'Fisteku',
  email: 'filan@example.com'
}

function mocks(api: MockApi) {
  api.withQuery(GET_CURRENT_USER, async () => {
    await delay(3000)
    return {
      id: '123',
      firstName: 'Filan',
      lastName: 'Fisteku',
      email: 'filan@example.com'
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
          <ProfileRoute {...props} />
        </CenterContent>
      )}
    </AppProvider>
  ))
