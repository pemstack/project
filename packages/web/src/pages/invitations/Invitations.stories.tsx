import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { Invitation } from './Invitation'

storiesOf('Invitations', module)
  .addDecorator(decorator())
  .add('default', () => <Invitation courseId={'123'} courseTitle={'Siguria 2020'} permission={'read'} dateInvited={'2019-09-18T19:13:24.000Z'} />)
