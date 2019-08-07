import React, { FunctionComponent } from 'react'
import './InlineCodeRenderer.css'

interface InlineCodeRendererProps {
  value: string
}

export const InlineCodeRenderer: FunctionComponent<InlineCodeRendererProps> = ({
  value
}) => {
  return (
    <code className='InlineCodeRenderer'>
      {value}
    </code>
  )
}
