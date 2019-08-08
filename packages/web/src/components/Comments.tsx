import React, { FunctionComponent } from 'react';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import './Comments.css'

export interface CommentsProps {
    likes: number
    dislikes: number
    action: string
    author: string
    title: string
  }

export const Comments: FunctionComponent<CommentsProps> = ({
    likes,
    dislikes,
    action,
    title,
    author
}) => {
  const actions = [
        <span>
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={()=>{likes++}}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
        </span>,
        <span>
          <Tooltip title="Dislike">
            <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={()=>{dislikes++}}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
        </span>,
        <span>Reply</span>,
    ];
  return(
    <Comment
        className='Comments__content'
        actions={actions}
        author={<h3 className='Comments__author'>{author}</h3>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={author}
            />
        }
        content={
            <p >
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully
                and efficiently.
            </p>
        }
        datetime={
            <Tooltip title={title} >
            <span style={{fontSize:'1.17em'}}>{title}</span>
            </Tooltip>
        }
    />
  )
}     
 
