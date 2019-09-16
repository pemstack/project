import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ManageCourse } from './ManageCourse'
import { reloadCourses } from './courses.mocks'
import { UserLayout } from 'app/layout/UserLayout'
import { CenterContent } from 'components'

storiesOf('courses/ManageCourse', module)
  .addDecorator(decorator())
  .add('default', () => <ManageCourse courseId='siguria' display='siguria' />)
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <ManageCourse courseId='siguria' display='siguria' />
      </CenterContent>
    </UserLayout>
  ))
  .add('reload mock data', () => (
    <div>
      Click to reload mock database{' '}
      <button onClick={reloadCourses}>Reload</button>
    </div>
  ))
