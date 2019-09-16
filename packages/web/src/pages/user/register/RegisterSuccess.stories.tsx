import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { RegisterSuccess } from './RegisterSuccess'

storiesOf('data-display/RegisterSuccess', module)
  .addDecorator(decorator())
  .add('default', () => <RegisterSuccess />)
