import React from 'react'
import { View, useAction, view } from 'app'
import { Button } from 'antd'
import { CenterContent } from 'components'
import { RegisterSuccess } from './RegisterSuccess'
import { RESEND_CONFIRM_EMAIL } from '../register/register.api'

export const RegisterSuccessRoute: View = ({ match }) => {
  const { resendToken } = match.params
  return (
    <CenterContent width='small'>
      <RegisterSuccess resendToken={resendToken} />
    </CenterContent>
  )
}

export default view(RegisterSuccessRoute)
