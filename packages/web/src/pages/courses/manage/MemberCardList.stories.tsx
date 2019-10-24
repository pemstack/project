import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import React from 'react'
import { MemberCardList } from './MemberCardList'

storiesOf('MemberCardList', module)
  .addDecorator(decorator())
  .add('default', () => <MemberCardList courseId='siguria' />)
