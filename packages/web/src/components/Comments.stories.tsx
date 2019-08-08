import React from 'react'
import { storiesOf } from '@storybook/react'
import {Comments, CommentsProps } from './Comments'

const comments: CommentsProps[]=[{
    likes:1,
    dislikes:2,
    title:'59 seconds ago',
    action:'liked',
    author:'Diellza Gashi'
},{
    likes:5,
    dislikes:9,
    title:'10 minutes ago',
    action:'disliked',
    author:'Art Krasniqi'
},{
    likes:10,
    dislikes:9,
    title:'1 hour ago',
    action:'disliked',
    author:'Dea Bytyqi'
}]

storiesOf('Comments', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#ffffff',
        paddingTop: '32px',
        paddingBottom: '32px',
      }}
    >
      {story()}
    </div>
  )).add('single', () => (
    <Comments
    likes={1}
    dislikes={2}
    title='2 minutes ago'
    action='liked'
    author='Diellza Gashi'
    />
  )).add('list of comments', () => (
    <>
      {comments.map((comment, i) => <div style={{borderBottom: '1.5px solid #dfeaf0',margin:'20px'}}><Comments key={i} {...comment} /></div>)}
    </>
  ))
