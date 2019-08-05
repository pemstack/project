import React, { FunctionComponent } from 'react'
import './NewsfeedPost.css'

interface NewsfeedPostProps {
  title: string
  author: string
  content: string
}

export const NewsfeedPost: FunctionComponent<NewsfeedPostProps> = ({
  title,
  author,
  content
}) => {
  return (
    <div className='NewsfeedPost'>
      <h3 className='NewsfeedPost__title'>{author}: {title}</h3>
      <p className='NewsfeedPost__content'>{content}</p>
    </div>
  )
}
