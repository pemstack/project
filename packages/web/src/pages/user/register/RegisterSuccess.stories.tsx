import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { RegisterSuccess } from './RegisterSuccess'

storiesOf('user/register/RegisterSuccess', module)
  .addDecorator(decorator())
  .add('default', () => <RegisterSuccess resendToken='123' />)
