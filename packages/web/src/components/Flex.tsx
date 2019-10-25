import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

interface FlexProps {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  className?: string
}

export const Flex: FunctionComponent<FlexProps> = ({
  children,
  justifyContent,
  alignItems,
  className
}) => {
  return (
    <div
      className={classNames('Flex', className)}
      style={{
        display: 'flex',
        justifyContent,
        alignItems
      }}
    >
      {children}
    </div>
  )
}
