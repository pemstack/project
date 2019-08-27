import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { LinkButton } from './LinkButton'

const Separator = () => (<div style={{ marginTop: '24px' }} />)

storiesOf('components/LinkButton', module)
  .addDecorator(decorator())
  .add('all types', () => (
    <div style={{ background: 'white', padding: '24px' }}>
      <LinkButton to='/'>Default</LinkButton>
      <Separator />
      <LinkButton to='/' type='primary'>Primary</LinkButton>
      <Separator />
      <LinkButton to='/' type='dashed'>Dashed</LinkButton>
      <Separator />
      <LinkButton to='/' type='danger'>Danger</LinkButton>
      <Separator />
      <LinkButton to='/' type='link'>Link</LinkButton>
      <Separator />
      <LinkButton to='/' type='ghost'>Ghost</LinkButton>
    </div>
  ))
