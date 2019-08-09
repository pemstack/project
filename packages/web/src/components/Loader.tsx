import React, { FunctionComponent, Suspense } from 'react'
import { Spin } from 'antd'
import './Loader.css'

interface LoaderProps {
  children?: React.ReactNode
  size?: 'small' | 'default' | 'large'
}

export const Loader: FunctionComponent<LoaderProps> = ({
  children,
  size
}) => {
  return (
    <Suspense
      fallback={<Spin className='Loader' size={size} />}
    >
      {children}
    </Suspense>
  )
}
