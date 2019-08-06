import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton } from 'antd'
import { Markdown } from './Markdown'
import './NewsfeedPost.css'

export interface NewsfeedPostProps {
  author: string
  content: string
  course: string
  date: string
  loading?: boolean
}

export const NewsfeedPost: FunctionComponent<NewsfeedPostProps> = ({
  author,
  content,
  course,
  date,
  loading
}) => {
  if (loading) {
    return (
      <Card
        className='NewsfeedPost'
        bodyStyle={{ padding: 0 }}
      >
        <div className='NewsfeedPost__content'>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      </Card>
    )
  }

  return (
    <Card
      className='NewsfeedPost'
      bodyStyle={{ padding: 0 }}
      title={
        <Card.Meta
          avatar={<Avatar icon='user' />}
          title={author}
          description={date}
        />
      }
      extra={<a href='/'>{course}</a>}
    >
      <div className='NewsfeedPost__content'>
        <Markdown>{content}</Markdown>
      </div>
    </Card>
  )
}
