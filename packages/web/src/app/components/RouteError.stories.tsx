import React from 'react'
import { storiesOf } from '@storybook/react'
import { decorator } from 'app/mock'
import { RouteError } from './RouteError'
import { UserLayout } from 'app/layout/UserLayout'
import { AnonymousLayout } from 'app/layout/AnonymousLayout'

storiesOf('app/RouteError', module)
  .addDecorator(decorator())
  .add('404', () => <RouteError code={404} />)
  .add('403', () => <RouteError code={403} />)
  .add('500', () => <RouteError code={500} />)
  .add('error', () => <RouteError />)
  .add('user layout 404', () => (
    <UserLayout>
      <RouteError code={404} />
    </UserLayout>
  ))
  .add('user layout 403', () => (
    <UserLayout>
      <RouteError code={403} />
    </UserLayout>
  ))
  .add('user layout 500', () => (
    <UserLayout>
      <RouteError code={500} />
    </UserLayout>
  ))
  .add('user layout error', () => (
    <UserLayout>
      <RouteError />
    </UserLayout>
  ))
  .add('anonymous layout 404', () => (
    <AnonymousLayout>
      <RouteError code={404} />
    </AnonymousLayout>
  ))
  .add('anonymous layout 403', () => (
    <AnonymousLayout>
      <RouteError code={403} />
    </AnonymousLayout>
  ))
  .add('anonymous layout 500', () => (
    <AnonymousLayout>
      <RouteError code={500} />
    </AnonymousLayout>
  ))
  .add('anonymous layout error', () => (
    <AnonymousLayout>
      <RouteError />
    </AnonymousLayout>
  ))
