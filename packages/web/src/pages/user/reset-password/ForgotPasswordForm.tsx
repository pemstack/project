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
      <h2>{t('ForgotPasswordForm.title')}</h2>
      <p>{t('ForgotPasswordForm.enterEmail')}</p>
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
          {t('ForgotPasswordForm.sendEmail')}
        </SubmitButton>
      </Form>
    </CollapseCard>
  )
}
