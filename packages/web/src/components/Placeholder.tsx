import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import './Placeholder.css'

interface PlaceholderProps {
  size?: 'default' | 'small' | 'large'
}

export const Placeholder: FunctionComponent<PlaceholderProps> = ({
  size = 'small'
}) => {
  return (
    <span className='Placeholder'>
      <Spin size={size} />
    </span>
  )
}
