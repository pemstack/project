import { storiesOf } from '@storybook/react'
import { reloadCourses } from 'api/courses.mocks'
import { UserLayout } from 'app/layout/UserLayout'
import { decorator } from 'app/mock'
import { CenterContent } from 'components'
import React from 'react'
import { ManageCourse } from './ManageCourse'

storiesOf('courses/ManageCourse', module)
  .addDecorator(decorator())
  .add('default', () => <ManageCourse courseId='siguria' courseDisplay='siguria' />)
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <ManageCourse courseId='siguria' courseDisplay='siguria' />
      </CenterContent>
    </UserLayout>
  ))
  .add('reload mock data', () => (
    <div>
      Click to reload mock database{' '}
      <button onClick={reloadCourses}>Reload</button>
    </div>
  ))
