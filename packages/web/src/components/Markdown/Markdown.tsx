import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { LinkRenderer } from './LinkRenderer'
import { CodeRenderer } from './CodeRenderer'
import { InlineCodeRenderer } from './InlineCodeRenderer'
import './Markdown.css'

interface MarkdownProps {
  children: string
}

const renderers = {
  link: LinkRenderer,
  code: CodeRenderer,
  inlineCode: InlineCodeRenderer
}

export const Markdown: FunctionComponent<MarkdownProps> = ({
  children
}) => {
  return (
    <div className='Markdown'>
      <ReactMarkdown renderers={renderers} source={children} />
    </div>
  )
}
