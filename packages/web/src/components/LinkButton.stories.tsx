import React, { Suspense } from 'react'
import { storiesOf } from '@storybook/react'
import { decorator, delay, MockApi } from 'app/mock'
import { LinkButton } from './LinkButton'
import { Query, useQuery } from 'app'
import { ErrorBoundary } from 'react-error-boundary';

const Separator = () => (<div style={{ marginTop: '24px' }} />)

const SUSPENDED: Query<number, { nr: number }> = {
  resource: ({ nr }) => `suspended/${nr}`,
  async fetch({ nr }) {
    console.log('fetch')
    await delay(3000)
    return nr
  }
}

function apiMocks(api: MockApi) {
  api.withQuery(SUSPENDED, async ({ nr }) => {
    console.log('wooing', nr)
    throw new Error('whoo')
    console.log('fetch2')
    await delay(3000)
    return nr
  })
}

const Something: React.FunctionComponent<{ nr: number }> = ({ nr }) => {
  let result: any
  try {
    result = useQuery(SUSPENDED, { nr }).read()
  } catch (e) {
    console.log(e)
    throw e
  }

  return (
    <span>
      Prop: {nr}, echoed: {JSON.stringify(result || {})}
    </span>
  )
}

const nrs = [1, 2]

const Fallback = () => (<div>Error</div>)

const ListStuff: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary FallbackComponent={Fallback} onError={x => console.log('CAUGHT')}>
        <ol>
          {nrs.map(nr => (
            <li key={nr}>
              <Something nr={nr} />
            </li>))}
        </ol>
      </ErrorBoundary>
    </Suspense>
  )
}

storiesOf('components/LinkButton', module)
  .addDecorator(decorator({ apiMocks }))
  .add('test', () => <ListStuff />)
  .add('all types', () => (
    <div style={{ background: 'white', padding: '24px' }}>
      <LinkButton to='/'>Default</LinkButton>
      <Separator />
      <LinkButton to='/' type='primary'>Primary</LinkButton>
      <Separator />
      <LinkButton to='/' type='dashed'>Dashed</LinkButton>
      <Separator />
      <LinkButton to='/' type='danger'>Danger</LinkButton>
      <Separator />
      <LinkButton to='/' type='link'>Link</LinkButton>
      <Separator />
      <LinkButton to='/' type='ghost'>Ghost</LinkButton>
    </div>
  ))
