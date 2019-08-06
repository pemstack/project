import React from 'react'
import { storiesOf } from '@storybook/react'
import { NewsfeedPost, NewsfeedPostProps } from './NewsfeedPost'

const props: NewsfeedPostProps = {
  author: 'Author',
  content: `
## Project 1 deadline

Project 1 deadline is set to **19/08/2019 23:59**.
Source code must be published to [Github](https://github.com).
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Donec non arcu elit.
Suspendisse volutpat nec nibh et malesuada.

### More info

Fusce fermentum leo et metus egestas,
hendrerit pellentesque lacus congue.
Donec pulvinar et lorem at pellentesque.
`,
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
