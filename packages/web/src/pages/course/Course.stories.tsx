import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { Course } from './Course'
import { mockCourses } from 'mocks'

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

storiesOf('Course', module)
  .addDecorator(decorator({ apiMocks: mockCourses }))
  .add('With backend', () => (
    <WithInput>
      {id => {
        if (id) {
          return <Course id={id} />
        } else {
          return <div>Enter id...</div>
        }
      }}
    </WithInput>
  ))
