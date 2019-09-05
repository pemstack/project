import React, { FunctionComponent } from 'react'
import './CenterContent.css'

interface CenterContentProps {
  children?: React.ReactNode
  width?: 'small' | 'medium' | 'default' | 'large' | number
}

export const CenterContent: FunctionComponent<CenterContentProps> = ({
  children,
  width = 'default'
}) => {
  if (typeof width === 'number') {
    return (
      <div className='CenterContent' style={{ maxWidth: `${width}px` }}>
        {children}
      </div>
    )
  }

  return (
    <div className={`CenterContent CenterContent--${width}`}>
      {children}
    </div>
  )
}
