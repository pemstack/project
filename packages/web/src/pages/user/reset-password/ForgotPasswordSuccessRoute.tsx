import React from 'react'
import { View, view } from 'app'
import { Result, Icon } from 'antd'
import { useTranslation } from 'react-i18next'

export const ForgotPasswordSuccessRoute: View = () => {
  const { t } = useTranslation()
  return (
    <Result
      icon={<Icon type='mail' theme='twoTone' />}
      status='info'
      title={t('ForgotPasswordSuccess.title')}
      subTitle={t('ForgotPasswordSuccess.subtitle')}
    />
  )
}

export default view(ForgotPasswordSuccessRoute)
