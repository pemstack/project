import React, { FunctionComponent } from 'react'
import { PrismAsyncLight } from 'react-syntax-highlighter'
import './CodeRenderer.css'
import { TimelineRenderer } from './TimelineRenderer';

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
  switch (language) {
    case 'timeline':
      return (
        <TimelineRenderer timeline={value} />
      )
    case 'timeline-alt':
      return (
        <TimelineRenderer alternate timeline={value} />
      )
    default:
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
}
