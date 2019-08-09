import React, { FunctionComponent, Suspense } from 'react'
import { Spin } from 'antd'
import './Loader.css'

interface LoaderProps {
  children?: React.ReactNode
}

export const Loader: FunctionComponent<LoaderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className='Loader'>
          <Spin size='large' />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
