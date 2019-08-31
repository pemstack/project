import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { UserLayout } from 'app/layout/UserLayout'
import { CenterContent } from 'components'
import { Courses } from './Courses'
import { mockCourses } from './courses.mocks'

storiesOf('courses/Courses', module)
  .addDecorator(decorator({ apiMocks: mockCourses }))
  .add('default', () => <Courses />)
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <Courses />
      </CenterContent>
    </UserLayout>
  ))
