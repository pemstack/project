import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ManageCourse } from './ManageCourse'
import { mockCourses, reloadCourses } from './courses.mocks'
import { UserLayout } from 'app/layout/UserLayout'
import { CenterContent } from 'components';

storiesOf('courses/ManageCourse', module)
  .addDecorator(decorator({ apiMocks: mockCourses }))
  .add('default', () => (
    <ManageCourse id='siguria' />
  ))
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent width='large'>
        <ManageCourse id='siguria' />
      </CenterContent>
    </UserLayout>
  ))
  .add('reload mock data', () => (
    <div>
      Click to reload mock database <button onClick={reloadCourses}>Reload</button>
    </div>
  ))
