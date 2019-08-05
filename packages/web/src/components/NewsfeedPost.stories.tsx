import React from 'react'
import { storiesOf } from '@storybook/react'
import { NewsfeedPost, NewsfeedPostProps } from './NewsfeedPost'

const props: NewsfeedPostProps = {
  author: 'Author',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nibh volutpat, feugiat augue et, ultricies tortor. Nulla ut tincidunt orci, mattis euismod libero. Morbi interdum ipsum nec neque laoreet luctus.',
  course: 'Data Security',
  date: '3 hours ago'
}

storiesOf('NewsfeedPost', module)
  .add('single post', () => (
    <NewsfeedPost {...props} />
  ))
  .add('list of posts', () => (
    <div
      style={{
        background: '#eee',
        paddingTop: '32px',
        paddingBottom: '32px'
      }}
    >
      <NewsfeedPost {...props} />
      <NewsfeedPost {...props} />
      <NewsfeedPost {...props} />
    </div>
  ))
