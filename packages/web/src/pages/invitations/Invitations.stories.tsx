import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { Invitation } from './Invitations'

storiesOf('Invitations', module)
  .addDecorator(decorator())
  .add('default', () => <Invitation courseId={'123'} courseTitle={'siguria'} permission={'read'} dateInvited={'123'} />)
