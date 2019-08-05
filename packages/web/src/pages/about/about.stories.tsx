import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider, MockApi } from 'app/mock'
import { AboutView } from './about.view'
import DefaultLayout from 'app/layout/DefaultLayout'
import { ME, UserRole, UserStatus } from 'api/user.api'

function mockApi(api: MockApi) {
  api.withQuery(ME, async () => ({
    id: '123',
    email: 'user@example.com',
    firstname: 'FirstName',
    lastname: 'LastName',
    roles: [UserRole.USER],
    status: UserStatus.CONFIRMED
  }))
}

storiesOf('AboutView', module)
  .add('complete', () => (
    <AppProvider path='/about' apiMocks={mockApi}>
      {(props) => (
        <DefaultLayout {...props}>
          <AboutView {...props} />
        </DefaultLayout>
      )}
    </AppProvider>
  ))
  .add('without layout', () => (
    <AppProvider path='/about' apiMocks={mockApi}>
      {(props) => (
        <AboutView {...props} />
      )}
    </AppProvider>
  ))
