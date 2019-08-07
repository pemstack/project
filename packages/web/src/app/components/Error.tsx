import { ErrorLike, stringifyError } from '@pema/utils'
import React, { FunctionComponent } from 'react'

export interface ErrorProps {
  code: number
  error?: ErrorLike
}

export const Error: FunctionComponent<ErrorProps> = ({ code, error }) => {
  return <div className='Error'>Error {code}: {stringifyError(error)}</div>
}
