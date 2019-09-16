import React, { FunctionComponent } from 'react';
import { Result, Button, Icon } from 'antd';

interface ConfrimEmailProps {}

export const ConfirmEmail: FunctionComponent<ConfrimEmailProps> = ({}) => {
  return (
    <Result
      icon={<Icon type='mail' theme='twoTone' />}
      status='info'
      title='Thank you for registering'
      subTitle='Check your email to verify your account'
      extra={
        <div>
          <p>Didn't get an email?</p>
          <Button type='primary'>Resend Email</Button>
        </div>
      }
    />
  );
};
