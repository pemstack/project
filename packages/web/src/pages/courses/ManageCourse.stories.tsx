import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { ManageCourse } from './ManageCourse'
import { mockCourses } from './courses.mocks'

storiesOf('courses/ManageCourse', module)
  .addDecorator(decorator({ apiMocks: mockCourses }))
  .add('default', () => (
    <ManageCourse id='siguria' />
  ))
