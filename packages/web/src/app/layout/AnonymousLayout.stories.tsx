import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { AnonymousLayout } from './AnonymousLayout'

storiesOf('app/AnonymousLayout', module)
  .addDecorator(decorator())
  .add('desktop layout', () => (
    <AnonymousLayout>
      Hello World!
    </AnonymousLayout>
  ))
