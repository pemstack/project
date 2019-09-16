import React, { FunctionComponent } from 'react';
import { Result, Button, Icon } from 'antd';
import { useTranslation } from 'react-i18next'


interface ConfrimEmailProps {}

export const ConfirmEmail: FunctionComponent<ConfrimEmailProps> = ({}) => {
  const { t } = useTranslation()
  return (
    <Result
      icon={<Icon type='mail' theme='twoTone' />}
      status='info'
      title={t('ConfirmEmail.title')}
      subTitle={t('ConfirmEmail.subtitle')}
      extra={
        <div>
          <p>{t('ConfirmEmail.extra.noEmail')}</p>
          <Button type='primary'>{t('ConfirmEmail.extra.resend')}</Button>
        </div>
      }
    />
  );
};
