import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider, decorator } from 'app/mock'
import { ProfileDropdown } from './ProfileDropdown'

storiesOf('ProfileDropdown', module)
  .addDecorator(decorator())
  .add('default', () => (
    <ProfileDropdown />
  ))
