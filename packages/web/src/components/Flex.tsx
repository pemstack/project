import React, { FunctionComponent } from 'react'

interface FlexProps {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
}

export const Flex: FunctionComponent<FlexProps> = ({
  children,
  justifyContent,
  alignItems
}) => {
  return (
    <div
      className='Flex'
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
