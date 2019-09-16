import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ConfirmEmailSuccess, ConfirmEmailError } from './ConfirmEmailRoute'

storiesOf('user/register/ConfirmEmail', module)
  .addDecorator(decorator())
  .add('success', () => <ConfirmEmailSuccess />)
  .add('error', () => <ConfirmEmailError />)
