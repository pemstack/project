import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import './Placeholder.css'

interface PlaceholderProps {
  size?: 'default' | 'small' | 'large'
  block?: boolean
}

export const Placeholder: FunctionComponent<PlaceholderProps> = ({
  size,
  block
}) => {
  if (typeof size === 'undefined') {
    size = block ? 'default' : 'small'
  }

  if (block) {
    return (
      <div className='Placeholder Placeholder--block'>
        <Spin size={size} />
      </div>
    )
  }
  return (
    <span className='Placeholder Placeholder--inline'>
      <Spin size={size} />
    </span>
  )
}
