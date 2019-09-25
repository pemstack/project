import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { Newsfeed } from './Newsfeed'
import { UserLayout } from 'app/layout/UserLayout'
import { CenterContent } from 'components'

storiesOf('courses/Newsfeed', module)
  .addDecorator(decorator())
  .add('default', () => <Newsfeed courseId='siguria' />)
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <Newsfeed courseId='siguria' />
      </CenterContent>
    </UserLayout>
  ))
