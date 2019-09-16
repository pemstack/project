import React, { FunctionComponent } from 'react'
import { useAction } from 'app'
import { Result, Button, Icon } from 'antd'
import { RESEND_CONFIRM_EMAIL } from './register.api'
import { useTranslation } from 'react-i18next'

export interface RegisterSuccessProps {
  resendToken: string
}

export const RegisterSuccess: FunctionComponent<RegisterSuccessProps> = ({
  resendToken
}) => {
  const { t } = useTranslation()
  const resendEmail = useAction(RESEND_CONFIRM_EMAIL)
  return (
    <Result
      icon={<Icon type='mail' theme='twoTone' />}
      status='info'
      title={t('RegisterSuccess.title')}
      subTitle={t('RegisterSuccess.subtitle')}
      extra={
        <div>
          <p>{t('RegisterSuccess.noEmail')}</p>
          <Button type='primary' onClick={() => resendEmail({ resendToken })}>
            {t('RegisterSuccess.resend')}
          </Button>
        </div>
      }
    />
  )
}
