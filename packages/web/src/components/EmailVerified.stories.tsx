import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorator } from 'app/mock';
import { EmailVerified } from './EmailVerified';

storiesOf('data-display/EmailVerified', module)
  .addDecorator(decorator())
  .add('default', () => <EmailVerified />);
