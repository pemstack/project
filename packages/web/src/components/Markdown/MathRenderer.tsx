import React, { Suspense, FunctionComponent } from 'react'
import { Spin } from 'antd'
import './MathRenderer.css'

const TeX = React.lazy(() => import('./TeX'))

export interface MathRendererProps {
  value: string
}

export const InlineMathRenderer: FunctionComponent<MathRendererProps> = ({ value }) => {
  return (
    <Suspense
      fallback={
        <span className='InlineMathRenderer--loading'>
          <Spin size='small' />
        </span>
      }
    >
      <TeX math={value} />
    </Suspense>
  )
}

export const MathRenderer: FunctionComponent<MathRendererProps> = ({ value }) => {
  return (
    <Suspense
      fallback={
        <div className='MathRenderer--loading'>
          <Spin />
        </div>
      }
    >
      <TeX math={value} block />
    </Suspense>
  )
}
