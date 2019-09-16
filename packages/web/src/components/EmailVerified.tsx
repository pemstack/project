import React, { FunctionComponent } from 'react';
import { Result, Button } from 'antd';

interface EmailVerifiedProps {}

export const EmailVerified: FunctionComponent<EmailVerifiedProps> = ({}) => {
  return (
    <Result
      status='success'
      title='Email confirmed'
      extra={<Button type='primary'>Log In</Button>}
    />
  );
};
