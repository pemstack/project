import { JObject } from '@pema/utils'

/* eslint-disable eqeqeq */

export function errorCode(error: any) {
  return (error && error.statusCode) || (500)
}

export function isErrorCode(code: number | string, error: any): boolean {
  // tslint:disable-next-line: triple-equals
  return errorCode(error) == code
}

export function stringParam<TDefault>
  (obj: JObject, key: string, defaultValue: TDefault): string | TDefault {
  const val = obj[key]
  if (typeof val === 'string') {
    return val
  } else {
    return defaultValue
  }
}
