import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { CenterContent, CollapseCard, Poll } from 'components'

const items = [
  { label: 'Yes', votes: 25 },
  { label: 'No', votes: 13 },
  { label: 'Not sure', votes: 3 }
]

storiesOf('Poll', module)
  .addDecorator(decorator())
  .add('default', () => (
    <CenterContent width='small'>
      <CollapseCard>
        <Poll
          title='Do you like this component?'
          items={items}
        />
      </CollapseCard>
    </CenterContent>
  ))
