import React from 'react'
import { storiesOf } from '@storybook/react'
import { Comment, CommentProps } from './Comment'
import { Divider } from 'antd'

const comments: CommentProps[] = [{
  likes: 1,
  dislikes: 2,
  title: '59 seconds ago',
  action: 'liked',
  author: 'Diellza Gashi',
  content: 'Hello world!'
}, {
  likes: 5,
  dislikes: 9,
  title: '10 minutes ago',
  action: 'disliked',
  author: 'Art Krasniqi',
  content: 'Hello world!'
}, {
  likes: 10,
  dislikes: 9,
  title: '1 hour ago',
  action: 'disliked',
  author: 'Dea Bytyqi',
  content: `
Lorem ipsum dolor sit amet, **consectetur adipiscing elit**.
Integer sit amet commodo ex, ut vehicula enim.

$$
y = 2x - 3
$$

Suspendisse pellentesque molestie nibh, volutpat maximus ipsum lacinia eu.

\`\`\`js
function sayHello(name) {
  console.log('Hello ' + name)
}
\`\`\`
`
}]

storiesOf('Comment', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        padding: '32px'
      }}
    >
      {story()}
    </div>
  )).add('single', () => (
    <Comment
      likes={1}
      dislikes={2}
      title='2 minutes ago'
      action='liked'
      author='Diellza Gashi'
      content='Hello World!'
    />
  )).add('list of comments', () => (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          <Comment {...comment} />
          <Divider style={{ margin: 0 }} />
        </div>
      ))}
    </>
  ))
