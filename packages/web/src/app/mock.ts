import { RouteParams } from './types'
import { Dictionary } from '@pema/utils'

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

function proxy<T = any>(): T {
  return new Proxy({}, {
    get(obj, prop) {
      return new Error(`Cannot access app service '${String(prop)}' in mock context.`)
    }
  }) as T
}

export function viewProps(): RouteParams
export function viewProps
  <TOverrides extends DeepPartial<RouteParams>>
  (overrides: TOverrides): RouteParams & TOverrides
export function viewProps(overrides?: DeepPartial<RouteParams>): RouteParams {
  const route: any = {}
  const match = {
    params: {},
    isExact: true,
    path: '/',
    url: '/'
  }

  const params: RouteParams = {
    action: 'REPLACE',
    location: {
      path: '/',
      query: {},
      hash: ''
    },
    href: '/',
    match,
    route,
    branch: [{ route, match }],
    state: {},
    session: {},
    shallow: false,
    router: proxy(),
    app: proxy()
  }

  return deepMerge(params, overrides) as RouteParams
}
