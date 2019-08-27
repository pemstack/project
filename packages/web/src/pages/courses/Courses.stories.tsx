import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, CenterContent } from 'app/mock'
import { Courses } from './Courses'
import { mockCourses } from 'mocks'
import { UserLayout } from 'app/layout/UserLayout'

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
