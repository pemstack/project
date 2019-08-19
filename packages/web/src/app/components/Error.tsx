import { ErrorLike, stringifyError } from '@pema/utils'
import React from 'react'
import { View } from 'app/types'

export interface ErrorProps {
  code: number
  error?: ErrorLike
}

export const Error: View<ErrorProps> = ({ code, error }) => {
  return <div className='Error'>Error {code}: {stringifyError(error)}</div>
}
