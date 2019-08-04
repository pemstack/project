import React from 'react'
import { storiesOf } from '@storybook/react'
import { viewProps } from 'app/mock'
import { AboutView } from './about.view'

storiesOf('AboutView', module)
  .add('default', () => <AboutView {...viewProps()} />)
