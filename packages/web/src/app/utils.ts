import { JObject } from '@pema/utils';

/* eslint-disable eqeqeq */

export function isErrorCode(code: number | string, error: any): boolean {
  // tslint:disable-next-line: triple-equals
  return error && error.json && error.json.statusCode == code
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
