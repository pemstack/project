import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { reloadCourses } from 'pages/courses/courses.mocks'

storiesOf('mocks', module)
  .addDecorator(decorator())
  .add('reload mock data', () => (
    <div>
      Click to reload mock database{' '}
      <button onClick={reloadCourses}>Reload</button>
    </div>
  ))
