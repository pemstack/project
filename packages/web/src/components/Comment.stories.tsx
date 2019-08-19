import React, { FunctionComponent } from 'react'
import { storiesOf } from '@storybook/react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { decorator } from 'app/mock'
import { Comment, CommentItem } from './Comment'
import { MarkdownEditor } from './MarkdownEditor'

const comments: CommentItem[] = [
  {
    likes: 1,
    dislikes: 2,
    title: '59 seconds ago',
    action: 'liked',
    author: 'Diellza Gashi',
    content: 'Hello world!'
  },
  {
    likes: 5,
    dislikes: 9,
    title: '10 minutes ago',
    action: 'disliked',
    author: 'Art Krasniqi',
    content: 'Hello world!'
  },
  {
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
  }
]

const EditorWithLocalization: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <MarkdownEditor
      value=''
      submit={
        <div style={{ marginTop: '16px' }}>
          <Button type='primary'>{t('button.submit')}</Button>
        </div>
      }
    />
  )
}

storiesOf('Comment', module)
  .addDecorator(decorator())
  .add('single', () => (
    <Comment
      item={{
        likes: 1,
        dislikes: 2,
        title: '2 minutes ago',
        action: 'liked',
        author: 'Diellza Gashi',
        content: 'Hello World!'
      }}
    />
  )).add('list of comments', () => (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          <Comment item={comment} />
        </div>
      ))}
      <div style={{ marginTop: '16px' }} />
      <EditorWithLocalization />
    </>
  ))
