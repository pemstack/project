import React, { FunctionComponent, useState } from 'react'
import { Tabs, Input } from 'antd'
import { Markdown } from './Markdown'
import './MarkdownEditor.css'

const { TabPane } = Tabs
const { TextArea } = Input

interface MarkdownEditorProps {
  value: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

interface MemoMarkdownProps {
  value: string
  shouldUpdate: boolean
}

class MemoMarkdown extends React.Component<MemoMarkdownProps> {
  shouldComponentUpdate(newProps: MemoMarkdownProps) {
    return newProps.shouldUpdate
  }

  render() {
    console.log('rerender md')
    return (
      <Markdown>{this.props.value}</Markdown>
    )
  }
}

export const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = ({
  value,
  onChange
}) => {
  const [currentTab, setCurrentTab] = useState('write')
  return (
    <div className='MarkdownEditor'>
      <Tabs
        onChange={setCurrentTab}
        type='card'
        className='MarkdownEditor__tabs'
        defaultActiveKey='write'
      >
        <TabPane tab='Write' key='write'>
          <div className='MarkdownEditor__write'>
            <TextArea
              className='MarkdownEditor__input'
              value={value}
              onChange={onChange}
            />
          </div>
        </TabPane>
        <TabPane tab='Preview' key='preview'>
          <div className='MarkdownEditor__preview'>
            <MemoMarkdown value={value || 'Nothing to preview'} shouldUpdate={currentTab === 'preview'} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
