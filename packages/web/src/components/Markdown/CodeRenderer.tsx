import React, { FunctionComponent } from 'react'
import { PrismAsyncLight } from 'react-syntax-highlighter'
import './CodeRenderer.css'

const Pre: FunctionComponent = ({ children }) => {
  return (
    <pre className='prism-highlight'>
      {children}
    </pre>
  )
}

const Code: FunctionComponent = ({ children }) => {
  return (
    <code className='prism-highlight'>
      {children}
    </code>
  )
}

interface CodeRendererProps {
  value: string
  language: string
}

export const CodeRenderer: FunctionComponent<CodeRendererProps> = ({
  value,
  language
}) => {
  return (
    <PrismAsyncLight
      className='CodeRenderer'
      showLineNumbers
      lineNumberContainerStyle={{
        float: 'left',
        paddingRight: '6px',
        color: '#555',
        textAlign: 'right'
      }}
      language={language || 'text'}
      lineNumberStyle={{ fontSize: '0.8em' }}
      useInlineStyles={false}
      CodeTag={Code}
      PreTag={Pre}
    >
      {value || ''}
    </PrismAsyncLight>
  )
}

export default CodeRenderer
