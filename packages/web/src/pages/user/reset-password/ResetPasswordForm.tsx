import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { t } from 'i18next'
import { Form, Input, SubmitButton } from 'forms'

interface ResetPasswordFormProps {
  email: string
}

export const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  email
}) => {
  return (
    <CollapseCard
      className='ResetPasswordForm'
    >
      <h2>Reset password</h2>
      <Form
        layout='vertical'
        className='ResetPasswordForm__form'
        showCaptcha
      >
        <input type='hidden' name='email' value={email} />
        <Form.Item
          name='newPassword'
          label='New Password'
        >
          <Input.Password
            name='newPassword'
            type='password'
            spellCheck={false}
          />
        </Form.Item>
        <SubmitButton
          block
          className='ResetPasswordForm__submit'
        >
          Submit
        </SubmitButton>
      </Form>
    </CollapseCard>
  )
}
