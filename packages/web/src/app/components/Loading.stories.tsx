import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { Loading } from './Loading'
import { UserLayout } from 'app/layout/UserLayout';
import { AnonymousLayout } from 'app/layout/AnonymousLayout';

storiesOf('app/Loading', module)
  .addDecorator(decorator())
  .add('default', () => <Loading />)
  .add('with user layout', () => (
    <UserLayout>
      <Loading />
    </UserLayout>
  ))
  .add('with anonymous layout', () => (
    <AnonymousLayout>
      <Loading />
    </AnonymousLayout>
  ))
