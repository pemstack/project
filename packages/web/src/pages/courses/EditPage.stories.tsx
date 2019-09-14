import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
//import { editPageSchema } from './courses.api'
import { CenterContent } from 'components'
import { Formik } from 'forms'
import { UserLayout } from 'app/layout/UserLayout'
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
