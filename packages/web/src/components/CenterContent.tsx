import React, { FunctionComponent } from 'react'
import './CenterContent.css'

interface CenterContentProps {
  children?: React.ReactNode
  width?: 'small' | 'default' | 'large'
}

export const CenterContent: FunctionComponent<CenterContentProps> = ({
  children,
  width = 'default'
}) => {
  return (
    <div className={`CenterContent CenterContent--${width}`}>
      {children}
    </div>
  )
}
