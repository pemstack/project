import { ErrorLike, stringifyError } from '@pema/utils'
import React, { FunctionComponent } from 'react'

interface ErrorProps {
  code: number
  error?: ErrorLike
}

const Error: FunctionComponent<ErrorProps> = ({ code, error }) => {
  return <div className='Error'>Error {code}: {stringifyError(error)}</div>
}

export default Error
