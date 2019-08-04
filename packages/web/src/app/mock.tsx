import React, { FunctionComponent, useState } from 'react'
import { AppContext } from '@pema/app-react'
import { Dictionary } from '@pema/utils'
import { createMemoryHistory } from 'history'
import { init } from 'app'
import { RouteParams } from './types'

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
  render?: (props: RouteParams) => JSX.Element
  children?: (props: RouteParams) => JSX.Element
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({
  path = '/',
  overrides,
  render,
  children
}) => {
  const [app, setApp] = useState(createApp)

  function noop() {
    return <div />
  }

  function createApp() {
    const root = init({}, {
      reload: () => {
        setApp(createApp())
      },
      createHistory: createMemoryHistory,
      historyProps: {
        initialEntries: [path]
      }
    });

    (root.router as any).locked = true
    return root
  }

  const params = deepMerge({ ...app.router.current }, overrides)
  return (
    <AppContext.Provider value={app}>
      {children && typeof children !== 'function'
        ? children
        : (render || children || noop)(params as RouteParams)}
    </AppContext.Provider>
  )
}
