import { storiesOf } from '@storybook/react'
import { UserLayout } from 'app/layout/UserLayout'
import { decorator } from 'app/mock'
import { CenterContent, Markdown, ReadMore } from 'components'
import moment from 'moment'
import React from 'react'
import { NewsfeedPost } from './NewsfeedPost'

function randomDate() {
  return moment().subtract(0.5 * Math.random(), 'hours')
}

const posts = [
  {
    title: 'Author 1',
    extra: 'Computer Networks',
    date: randomDate(),
    content: `
## Some title

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`
  },
  {
    title: 'Author 2',
    extra: 'Data Security',
    date: randomDate(),
    content: `
## Project 1 deadline

Project 1 deadline is set to **19/08/2019 23:59**.
Source code must be published to [Github](https://github.com).
Lorem ipsum dolor sit amet, consectetur adipiscing elit \`sayHello('World')\`.
Donec non arcu elit.  $y = 2x+3$
Suspendisse volutpat nec nibh et malesuada.

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

---

Donec pulvinar et lorem at pellentesque.

\`\`\`xml
<root>
  <name>Test</name>
  <age value="30" />
</root>
\`\`\`

In aliquam scelerisque porttitor.
Morbi ultrices efficitur porttitor.

$$
y = \\sum_{i=0}^{n}{(3i^2-5)}
$$

Phasellus id justo id turpis pulvinar cursus in vel erat.
Sed consectetur ante odio, a vulputate felis malesuada vel.
`
  },
  {
    title: 'Author 3',
    extra: 'Computer Networks',
    date: randomDate(),
    content: `Some simple content.`
  },
]

storiesOf('data-display/NewsfeedPost', module)
  .addDecorator(decorator())
  .add('single', () => (
    <NewsfeedPost
      title='Post Author'
      date={randomDate()}
      extra={<a href='/'>Data Security</a>}
    >
      <ReadMore>
        <Markdown source='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />
      </ReadMore>
    </NewsfeedPost>
  ))
  .add('loading', () => (
    <NewsfeedPost
      loading
      title='Post Author'
      date={randomDate()}
      extra={<a href='/'>Data Security</a>}
    >
      <ReadMore>
        <Markdown source='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' />
      </ReadMore>
    </NewsfeedPost>
  ))
  .add('list of posts', () => (
    <UserLayout>
      <CenterContent>
        {posts.map((post, i) => (
          <div key={i} style={{ marginTop: '24px', marginBottom: '24px' }}>
            <NewsfeedPost
              title={post.title}
              date={post.date}
              extra={<a href='/'>{post.extra}</a>}
            >
              <ReadMore>
                <Markdown source={post.content} />
              </ReadMore>
            </NewsfeedPost>
          </div>
        ))}
      </CenterContent>
    </UserLayout>
  ))
