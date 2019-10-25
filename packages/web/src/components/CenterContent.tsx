import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import './CenterContent.css'

interface CenterContentProps {
  children?: React.ReactNode
  width?: 'small' | 'medium' | 'default' | 'large' | number
  className?: string
}

export const CenterContent: FunctionComponent<CenterContentProps> = ({
  children,
  className,
  width = 'default'
}) => {
  if (typeof width === 'number') {
    return (
      <div
        className={classNames('CenterContent', className)}
        style={{ maxWidth: `${width}px` }}
      >
        {children}
      </div>
    )
  }

  return (
    <div className={classNames('CenterContent', `CenterContent--${width}`, className)}>
      {children}
    </div>
  )
}
