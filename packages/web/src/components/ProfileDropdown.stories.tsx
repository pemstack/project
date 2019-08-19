import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ProfileDropdown } from './ProfileDropdown'

storiesOf('ProfileDropdown', module)
  .addDecorator(decorator())
  .add('default', () => (
    <ProfileDropdown name='John Doe' />
  ))
