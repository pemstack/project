import React, { FunctionComponent } from 'react'
import { Card, Avatar, Skeleton, Tooltip } from 'antd'
import { Markdown } from './Markdown'
import { ReadMore } from './ReadMore'
import './NewsfeedPost.css'

export interface NewsfeedPostItem {
  author: string
  content: string
  course: string
  date: string
}

export interface NewsfeedPostProps {
  item: NewsfeedPostItem
  loading?: boolean
}

export const NewsfeedPost: FunctionComponent<NewsfeedPostProps> = ({
  item: {
    author,
    content,
    course,
    date
  },
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
          description={<Tooltip title={date}>{date}</Tooltip>}
        />
      }
      extra={<a href='/'>{course}</a>}
    >
      <div className='NewsfeedPost__content'>
        <ReadMore>
          <Markdown>{content}</Markdown>
        </ReadMore>
      </div>
    </Card>
  )
}
