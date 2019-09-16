import React, { FunctionComponent } from 'react'
import { useAction } from 'app'
import { Result, Button, Icon } from 'antd'
import { RESEND_CONFIRM_EMAIL } from './register.api'

export interface RegisterSuccessProps {
  resendToken: string
}

export const RegisterSuccess: FunctionComponent<RegisterSuccessProps> = ({
  resendToken
}) => {
  const resendEmail = useAction(RESEND_CONFIRM_EMAIL)
  return (
    <Result
      icon={<Icon type='mail' theme='twoTone' />}
      status='info'
      title='Thank you for registering'
      subTitle='Check your email to verify your account'
      extra={
        <div>
          <p>Didn't get an email?</p>
          <Button type='primary' onClick={() => resendEmail({ resendToken })}>
            Resend Email
          </Button>
        </div>
      }
    />
  )
}
