import React, { FunctionComponent } from 'react'
import { Comment as $Comment, Icon, Tooltip, Avatar } from 'antd'
import { Markdown } from './Markdown'
import './Comment.css'

export interface CommentProps {
  likes: number
  dislikes: number
  action: string
  author: string
  title: string
  content: string
}

export const Comment: FunctionComponent<CommentProps> = ({
  likes,
  dislikes,
  action,
  title,
  author,
  content
}) => {
  const actions = [
    (
      <span>
        <Tooltip title='Like'>
          <Icon
            type='like'
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={() => { likes++ }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>
    ),
    (
      <span>
        <Tooltip title='Dislike'>
          <Icon
            type='dislike'
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={() => { dislikes++ }}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>
    ),
    (
      <span>Reply</span>
    )
  ]

  return (
    <$Comment
      className='Comment'
      actions={actions}
      author={<h3 className='Comment__author'>{author}</h3>}
      avatar={<Avatar icon='user' />}
      content={
        <Markdown>{content}</Markdown>
      }
      datetime={
        <Tooltip title={title}>{title}</Tooltip>
      }
    />
  )
}
