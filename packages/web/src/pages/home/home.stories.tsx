import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from 'app/mock'
import { HomeView } from './home.view'

storiesOf('Home', module)
  .add('default', () => (
    <AppProvider>
      {props => <HomeView {...props} />}
    </AppProvider>
  ))
