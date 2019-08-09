import React, { FunctionComponent, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { MarkdownEditor } from './MarkdownEditor'
import { Button } from 'antd'

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
Morbi ultrices efficitur porttitor.

$$
y = \\sum_{i=0}^{n}{(3i^2-5)}
$$

Phasellus id justo id turpis pulvinar cursus in vel erat.
Sed consectetur ante odio, a vulputate felis malesuada vel.
`

storiesOf('MarkdownEditor', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        padding: '32px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <InputController />
  ))
  .add('with default value', () => (
    <InputController defaultValue={longMarkdown} />
  ))
  .add('with submit button', () => (
    <InputControllerSubmit />
  ))
