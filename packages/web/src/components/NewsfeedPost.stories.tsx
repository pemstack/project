import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { NewsfeedPost, NewsfeedPostProps } from './NewsfeedPost'

const data: NewsfeedPostProps = {
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

function ClickHelp() {
  return (
    <div style={{ marginLeft: '24px' }}>Click on the card to toggle loading.</div>
  )
}

function Loadable(props: NewsfeedPostProps) {
  const [loading, setLoading] = useState(!!props.loading)
  return (
    <div onClick={() => setLoading(x => !x)}>
      <NewsfeedPost {...props} loading={loading} />
    </div>
  )
}

storiesOf('NewsfeedPost', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        paddingTop: '32px',
        paddingBottom: '32px'
      }}
    >
      {story()}
    </div>
  ))
  .add('single post', () => (
    <>
      <ClickHelp />
      <Loadable {...data} />
    </>
  ))
  .add('list of posts', () => (
    <>
      <ClickHelp />
      <Loadable {...data} />
      <Loadable {...data} loading />
      <Loadable {...data} loading />
    </>
  ))
