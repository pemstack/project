import React, { FunctionComponent } from 'react'
import './ForgotPasswordForm.css'
import { CollapseCard } from 'components'
import { Form, Input, SubmitButton } from 'forms'
import { useTranslation } from 'react-i18next'

interface ForgotPasswordFormProps { }

export const ForgotPasswordForm: FunctionComponent<ForgotPasswordFormProps> = ({ }) => {
  const { t } = useTranslation()
  return (
    <CollapseCard
      className='ForgotPasswordForm'
    >
      <h2>Forgot password</h2>
      <p>Please enter your email to reset your password</p>
      <Form
        layout='vertical'
        className='ForgotPasswordForm__form'
        showCaptcha
      >
        <Form.Item
          name='email'
          label={t('user.label.email')}
        >
          <Input
            name='email'
            type='text'
            spellCheck={false}
          />
        </Form.Item>
        <SubmitButton
          block
          className='ForgotPasswordForm__submit'
        >
          Send email
          </SubmitButton>
      </Form>
    </CollapseCard>
  )
}
