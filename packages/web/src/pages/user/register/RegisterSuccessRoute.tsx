import React from 'react'
import { View, view } from 'app'
import { CenterContent } from 'components'
import { RegisterSuccess } from './RegisterSuccess'

export const RegisterSuccessRoute: View = ({ match }) => {
  const { resendToken } = match.params
  return (
    <CenterContent width='small'>
      <RegisterSuccess resendToken={resendToken} />
    </CenterContent>
  )
}

export default view(RegisterSuccessRoute)
