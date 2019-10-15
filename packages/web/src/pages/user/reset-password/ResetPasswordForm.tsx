import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { Form, Input, SubmitButton } from 'forms'
import { useTranslation } from 'react-i18next'

interface ResetPasswordFormProps {
  email: string
}

export const ResetPasswordForm: FunctionComponent<ResetPasswordFormProps> = ({
  email
}) => {
  const { t } = useTranslation()
  return (
    <CollapseCard
      className='ResetPasswordForm'
    >
      <h2>{t('ResetPasswordForm.title')}</h2>
      <Form
        layout='vertical'
        className='ResetPasswordForm__form'
        showCaptcha
      >
        <input type='hidden' name='email' value={email} />
        <Form.Item
          name='newPassword'
          label={t('user.label.newPassword')}
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
          {t('button.submit')}
        </SubmitButton>
      </Form>
    </CollapseCard>
  )
}
