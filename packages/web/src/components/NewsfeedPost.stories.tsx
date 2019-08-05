import React from 'react'
import { storiesOf } from '@storybook/react'
import { NewsfeedPost } from './NewsfeedPost'

storiesOf('NewsfeedPost', module)
  .add('single post', () => (
    <NewsfeedPost author='Author' title='Post' content='Post content' />
  ))
  .add('list of posts', () => (
    <div>
      <NewsfeedPost author='Author 1' title='Post 1' content='Post 1 content' />
      <NewsfeedPost author='Author 2' title='Post 2' content='Post 2 content' />
      <NewsfeedPost author='Author 3' title='Post 3' content='Post 3 content' />
    </div>
  ))
