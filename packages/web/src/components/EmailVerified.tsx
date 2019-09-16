import React, { FunctionComponent } from 'react';
import { Result, Button } from 'antd';
import { useTranslation } from 'react-i18next'

interface EmailVerifiedProps {}

export const EmailVerified: FunctionComponent<EmailVerifiedProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <Result
      status='success'
      title={t('EmailVerified.title')}
      extra={<Button type='primary'>{t('EmailVerified.login')}</Button>}
    />
  );
};
