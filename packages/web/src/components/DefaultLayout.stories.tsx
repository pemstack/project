import React from 'react'
import { storiesOf } from '@storybook/react'
import { DefaultLayout } from "./DefaultLayout";

storiesOf('DefaultLayout', module)
  .add('desktop layout', () => (
    <DefaultLayout>
      Hello World!
    </DefaultLayout>
  ))
