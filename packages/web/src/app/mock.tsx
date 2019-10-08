import { MockApiClient } from '@pema/state/lib/mock-api-client'
import { Dictionary } from '@pema/utils'
import { init } from 'app'
import { createMemoryHistory } from 'history'
import { mockCourses } from 'pages/courses/courses.mocks'
import { mockInvitations } from 'pages/invitations/invitations.mocks'
import React, { FunctionComponent, useState } from 'react'
import { MemoryStore } from 'stores'
import { AppRoot } from './components/AppRoot'
import { RouteParams } from './types'

export interface MockApi {
  withQuery: MockApiClient['withQuery']
  withAction: MockApiClient['withAction']
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer UChild>
  ? ReadonlyArray<DeepPartial<UChild>>
  : DeepPartial<T[P]>
}

function deepMerge(target: Dictionary, source?: Dictionary) {
  function isObject(obj: any): obj is Dictionary {
    return obj && typeof obj === 'object'
  }

  if (!isObject(target) || !isObject(source)) {
    return target
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

export interface AppProviderProps {
  path?: string
  overrides?: DeepPartial<RouteParams>
  apiMocks?: (client: MockApi) => void
  render?: (props: RouteParams) => React.ReactNode
  children?: React.ReactNode | ((props: RouteParams) => React.ReactNode)
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({
  path = '/',
  overrides,
  apiMocks,
  render,
  children
}) => {
  const [app, setApp] = useState(createApp)

  function noop() {
    return <div />
  }

  function createApp() {
    const root = init(
      {},
      {
        reload: () => {
          console.log('Reloading app...')
          setApp(createApp())
        },
        createHistory: createMemoryHistory,
        historyProps: {
          initialEntries: [path]
        },
        ApiClient: MockApiClient,
        Session: MemoryStore
      }
    )

    const client = root.apiClient as MockApiClient
    mockCourses(client)
    mockInvitations(client)
    if (typeof apiMocks === 'function') {
      apiMocks(client)
    }

    (root.router as any).locked = true
    return root
  }

  const params = deepMerge({ ...app.router.current }, overrides)
  return (
    <AppRoot app={app}>
      {children && typeof children !== 'function'
        ? children
        : (render ||
          (children as ((props: RouteParams) => React.ReactNode)) ||
          noop)(params as RouteParams)}
    </AppRoot>
  )
}

export function decorator(props: AppProviderProps = {}) {
  return (story: () => any) => (
    <AppProvider {...props}>
      <div
        style={{
          background: '#eee',
          padding: '32px'
        }}
      >
        {story()}
      </div>
    </AppProvider>
  )
}

export interface CenterContentProps {
  maxWidth?: number
  children?: React.ReactNode
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
