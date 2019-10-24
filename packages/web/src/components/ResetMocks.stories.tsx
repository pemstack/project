import { storiesOf } from '@storybook/react'
import { reloadCourses } from 'api/courses.mocks'
import { decorator } from 'app/mock'
import React from 'react'

storiesOf('mocks', module)
  .addDecorator(decorator())
  .add('reload mock data', () => (
    <div>
      Click to reload mock database{' '}
      <button onClick={reloadCourses}>Reload</button>
    </div>
  ))
