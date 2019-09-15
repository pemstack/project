import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider, decorator, MockApi, delay } from 'app/mock'
import { ProfileRoute } from './ProfileRoute'
import { GET_CURRENT_USER } from 'api/user.api'
import { CenterContent } from 'components'

function mocks(api: MockApi) {
  api.withQuery(GET_CURRENT_USER, async () => {
    await delay(500)
    return {
      userId: '123',
      firstName: 'Filan',
      lastName: 'Fisteku',
      email: 'filan@example.com'
    }
  })
}

storiesOf('user/profile/ProfileRoute', module)
  .addDecorator(decorator())
  .add('default', () => (
    <AppProvider path='/user/profile' apiMocks={mocks}>
      {props => (
        <CenterContent>
          <ProfileRoute {...props} />
        </CenterContent>
      )}
    </AppProvider>
  ))
