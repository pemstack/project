import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { DefaultLayout } from './DefaultLayout'

storiesOf('DefaultLayout', module)
  .addDecorator(decorator())
  .add('desktop layout', () => (
    <DefaultLayout>
      Hello World!
    </DefaultLayout>
  ))
