import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppProvider } from 'app/mock'
import { AboutView } from './about.view'
import DefaultLayout from 'app/layout/DefaultLayout';

storiesOf('AboutView', module)
  .add('default', () => (
    <AppProvider path='/about'>
      {(props) => (
        <DefaultLayout {...props}>
          <AboutView {...props} />
        </DefaultLayout>
      )}
    </AppProvider>
  ))
