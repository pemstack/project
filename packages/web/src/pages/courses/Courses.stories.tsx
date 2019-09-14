import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { UserLayout } from 'app/layout/UserLayout'
import { CenterContent } from 'components'
import { Courses } from './Courses'

storiesOf('courses/Courses', module)
  .addDecorator(decorator())
  .add('default', () => <Courses />)
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent>
        <Courses />
      </CenterContent>
    </UserLayout>
  ))
