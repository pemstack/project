import React, { FunctionComponent } from 'react'
import { Card, Avatar, Icon } from 'antd'
import './NewsfeedPost.css'

export interface NewsfeedPostProps {
  author: string
  content: string
  course: string
  date: string
}

export const NewsfeedPost: FunctionComponent<NewsfeedPostProps> = ({
  author,
  content,
  course,
  date
}) => {
  return (
    <Card
      className='NewsfeedPost'
      title={
        <Card.Meta
          avatar={<Avatar icon='user' />}
          title={author}
          description={date}
        />
      }
      extra={<a href='/'>{course}</a>}
    >
      <div className='NewsfeedPost__content'>{content}</div>
    </Card>
  )
}
