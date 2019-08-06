import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { NewsfeedPost, NewsfeedPostProps } from './NewsfeedPost'

const posts: NewsfeedPostProps[] = [
  {
    author: 'Author 1',
    course: 'Computer Networks',
    date: '5 minutes ago',
    content: `Some simple content.`
  },
  {
    author: 'Author 2',
    course: 'Data Security',
    date: '3 hours ago',
    content: `
## Project 1 deadline

Project 1 deadline is set to **19/08/2019 23:59**.
Source code must be published to [Github](https://github.com).
Lorem ipsum dolor sit amet, consectetur adipiscing elit \`sayHello('World')\`.
Donec non arcu elit.  $y = 2x+3$
Suspendisse volutpat nec nibh et malesuada.

$$
y = \\sum_{i=0}^{n}{(3i^2-5)}
$$

\`\`\`js
function sayHello(name) {
  console.log('Hello ' + name)
}

function arraySum(array) {
  let sum = 0
  for (let i = 0, i < array.length; i++) {
    sum += array[i]
  }

  return sum
}
\`\`\`

### More info

Fusce fermentum leo et metus egestas,
hendrerit pellentesque lacus congue.
Donec pulvinar et lorem at pellentesque.

\`\`\`xml
<root>
  <name>Test</name>
  <age value="30" />
</root>
\`\`\`

In aliquam scelerisque porttitor.
Morbi ultrices efficitur porttitor.
Phasellus id justo id turpis pulvinar cursus in vel erat.
Sed consectetur ante odio, a vulputate felis malesuada vel.
`
  },
  {
    author: 'Author 3',
    course: 'Computer Networks',
    date: '2 days ago',
    content: `Some simple content.`
  },
]

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
  .add('single', () => (
    <>
      <ClickHelp />
      <Loadable
        author='Post Author'
        date='2 days ago'
        course='Data Security'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      />
    </>
  ))
  .add('loading', () => (
    <>
      <ClickHelp />
      <Loadable
        author='Post Author'
        date='2 days ago'
        course='Data Security'
        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        loading
      />
    </>
  ))
  .add('list of posts', () => (
    <>
      <ClickHelp />
      {posts.map((post, i) => <Loadable key={i} {...post} />)}
    </>
  ))
