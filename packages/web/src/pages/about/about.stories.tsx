import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from 'app/mock'
import { AboutView } from './about.view'
import DefaultLayout from 'app/layout/DefaultLayout';

storiesOf('AboutView', module)
  .add('complete', () => (
    <AppProvider path='/about'>
      {(props) => (
        <DefaultLayout {...props}>
          <AboutView {...props} />
        </DefaultLayout>
      )}
    </AppProvider>
  ))
  .add('without layout', () => (
    <AppProvider path='/about'>
      {(props) => (
        <AboutView {...props} />
      )}
    </AppProvider>
  ))
