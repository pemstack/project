import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkMathPlugin from 'remark-math'
import { parseProps } from './parse-props'
import './Markdown.css'

// Eagerly loaded components
import { Divider } from 'antd'
import { LinkRenderer } from './LinkRenderer'
import { InlineCodeRenderer } from './InlineCodeRenderer'

// Lazily loaded components
const MathRenderer = React.lazy(() => import('./MathRenderer'))
const CodeRenderer = React.lazy(() => import('./CodeRenderer'))
const TimelineRenderer = React.lazy(() => import('./TimelineRenderer'))

interface MarkdownProps {
  source: string
}

interface CodeDispatcherProps {
  value: string
  language: string
}

export const CodeDispatcher: FunctionComponent<CodeDispatcherProps> = ({
  value,
  language
}) => {
  const [props, lang] = parseProps(language)
  switch (lang) {
    case 'timeline':
      return (
        <TimelineRenderer {...props} timeline={value} />
      )
    default:
      return (
        <CodeRenderer language={lang} value={value} />
      )
  }
}

interface MathProps {
  value: string
}

const renderers = {
  link: LinkRenderer,
  code: CodeDispatcher,
  inlineCode: InlineCodeRenderer,
  math: ({ value }: MathProps) => <MathRenderer block value={value} />,
  inlineMath: ({ value }: MathProps) => <MathRenderer value={value} />,
  thematicBreak: Divider
}

export const Markdown: FunctionComponent<MarkdownProps> = React.memo(({
  source
}) => {
  return (
    <div className='Markdown'>
      <ReactMarkdown
        plugins={[RemarkMathPlugin]}
        renderers={renderers}
        source={source}
      />
    </div>
  )
})
