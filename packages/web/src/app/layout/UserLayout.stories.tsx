import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { UserLayout } from './UserLayout'

storiesOf('UserLayout', module)
  .addDecorator(decorator())
  .add('desktop layout', () => (
    <UserLayout>
      Hello World!
    </UserLayout>
  ))
