import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { Divider } from 'antd'
import { LinkRenderer } from './LinkRenderer'
import { CodeRenderer } from './CodeRenderer'
import { InlineCodeRenderer } from './InlineCodeRenderer'
import { MathRenderer, InlineMathRenderer } from './MathRenderer'
import RemarkMathPlugin from 'remark-math'
import './Markdown.css'

interface MarkdownProps {
  children: string
}

const renderers = {
  link: LinkRenderer,
  code: CodeRenderer,
  inlineCode: InlineCodeRenderer,
  math: MathRenderer,
  inlineMath: InlineMathRenderer,
  thematicBreak: Divider
}

export const Markdown: FunctionComponent<MarkdownProps> = ({
  children
}) => {
  return (
    <div className='Markdown'>
      <ReactMarkdown
        plugins={[RemarkMathPlugin]}
        renderers={renderers}
        source={children}
      />
    </div>
  )
}
