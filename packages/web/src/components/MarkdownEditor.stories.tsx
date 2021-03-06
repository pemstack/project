import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from 'antd'
import { decorator } from 'app/mock'
import { MarkdownEditor } from './MarkdownEditor'

interface InputControllerProps {
  defaultValue?: string
}

const InputController: FunctionComponent<InputControllerProps> = ({
  defaultValue = ''
}) => {
  const [markdown, setMarkdown] = useState(defaultValue)
  return (
    <MarkdownEditor value={markdown} onChange={e => setMarkdown(e.target.value)} />
  )
}

const InputControllerSubmit: FunctionComponent<InputControllerProps> = ({
  defaultValue = ''
}) => {
  const [markdown, setMarkdown] = useState(defaultValue)
  return (
    <MarkdownEditor
      value={markdown}
      onChange={e => setMarkdown(e.target.value)}
      submit={
        <div style={{ marginTop: '16px' }}>
          <Button type='primary'>Submit</Button>
        </div>
      }
    />
  )
}

const longMarkdown = `
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

> Donec sem tellus, sollicitudin in tristique eu, rhoncus a enim.
> Phasellus dignissim blandit magna nec maximus.

Morbi ultrices efficitur porttitor.

$$
y = \\sum_{i=0}^{n}{(3i^2-5)}
$$

Cras at viverra odio. Donec id accumsan ligula. Vestibulum lacinia arcu mi, nec tempus massa convallis vel.
Suspendisse quis elit at diam maximus venenatis. Cras iaculis rutrum posuere.
Fusce tempor elementum risus, quis vulputate sem accumsan ut.
Nulla sed quam eget arcu posuere dictum vel et elit. Morbi efficitur mollis suscipit.
Nullam aliquam quam id sollicitudin lobortis. Curabitur scelerisque finibus rutrum.

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

Phasellus id justo id turpis pulvinar cursus in vel erat.
Sed consectetur ante odio, a vulputate felis malesuada vel.
`.trim()

storiesOf('data-input/MarkdownEditor', module)
  .addDecorator(decorator())
  .add('default', () => (
    <InputController />
  ))
  .add('with default value', () => (
    <InputController defaultValue={longMarkdown} />
  ))
  .add('with submit button', () => (
    <InputControllerSubmit />
  ))
