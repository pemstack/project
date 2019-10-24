import { storiesOf } from '@storybook/react'
import { UserLayout } from 'app/layout/UserLayout'
import { decorator } from 'app/mock'
import { CenterContent } from 'components'
import React from 'react'
import { EditPage } from './EditPage'

storiesOf('courses/EditPageForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent width='medium'>
      <EditPage courseId='siguria' pageId='info' />
    </CenterContent>
  ))
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent width='medium'>
        <EditPage courseId='siguria' pageId='info' />
      </CenterContent>
    </UserLayout>
  ))
