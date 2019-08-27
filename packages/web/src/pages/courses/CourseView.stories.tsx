import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, CenterContent } from 'app/mock'
import { CourseView } from './CourseView'
import { AnonymousLayout } from 'app/layout/AnonymousLayout'
import { UserLayout } from 'app/layout/UserLayout'
import { mockCourses } from './courses.mocks'

interface WithInputProps {
  children?: (text: string) => React.ReactNode
}

export const WithInput: FunctionComponent<WithInputProps> = ({
  children
}) => {
  const [text, setText] = useState('siguria')
  return (
    <div className='WithInput'>
      Course id: <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <div style={{ paddingTop: '16px' }}>
        {children && children(text)}
      </div>
    </div>
  )
}

storiesOf('courses/CourseView', module)
  .addDecorator(decorator({ apiMocks: mockCourses }))
  .add('with id', () => (
    <WithInput>
      {id => {
        if (id) {
          return <CourseView id={id} />
        } else {
          return <div>Enter id...</div>
        }
      }}
    </WithInput>
  ))
  .add('with user layout', () => (
    <UserLayout>
      <CenterContent maxWidth={1024}>
        <CourseView id='siguria' />
      </CenterContent>
    </UserLayout>
  ))
  .add('with anonymous layout', () => (
    <AnonymousLayout>
      <CenterContent maxWidth={1024}>
        <CourseView id='siguria' />
      </CenterContent>
    </AnonymousLayout>
  ))
