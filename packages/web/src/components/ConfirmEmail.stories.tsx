import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorator } from 'app/mock';
import { ConfirmEmail } from './ConfirmEmail';

storiesOf('data-display/ConfirmEmail', module)
  .addDecorator(decorator())
  .add('default', () => <ConfirmEmail />);
