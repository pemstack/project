import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, MockApi, delay } from 'app/mock'
import { Course } from './Course'
import { GET_COURSE_PAGES } from 'api/courses.api'

interface WithInputProps {
  children?: (text: string) => React.ReactNode
}

export const WithInput: FunctionComponent<WithInputProps> = ({
  children
}) => {
  const [text, setText] = useState('3ccjfrcjziggaxr')
  console.log(text)
  return (
    <div className='WithInput'>
      Course id: <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <div>
        {children && children(text)}
      </div>
    </div>
  )
}

function apiMocks(api: MockApi) {
  api.withQuery(GET_COURSE_PAGES, async ({ id }) => {
    await delay(1000)
    switch (id) {
      case 'siguria':
        return [
          { id: 'info', title: 'Info', isPublic: true },
          { id: 'assignments', title: 'Assignments', isPublic: false },
        ]
      default:
        throw new Error('Course does not exist.')
    }
  })
}

storiesOf('Course', module)
  .addDecorator(decorator({ apiMocks }))
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
