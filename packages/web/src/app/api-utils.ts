/* eslint-disable eqeqeq */

export function isErrorCode(code: number | string, error: any): boolean {
  // tslint:disable-next-line: triple-equals
  return error && error.json && error.json.statusCode == code
}
