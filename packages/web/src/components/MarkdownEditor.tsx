import React, { FunctionComponent, useState } from 'react'
import { Tabs, Input } from 'antd'
import { Markdown } from './Markdown'
import './MarkdownEditor.css'
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs
const { TextArea } = Input

interface MemoMarkdownProps {
  value: string
  shouldUpdate: boolean
}

class MemoMarkdown extends React.Component<MemoMarkdownProps> {
  shouldComponentUpdate(newProps: MemoMarkdownProps) {
    return newProps.shouldUpdate
  }

  render() {
    return (
      <Markdown>{this.props.value}</Markdown>
    )
  }
}

interface MarkdownEditorProps {
  value: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  submit?: React.ReactNode
}

export const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = ({
  value,
  onChange,
  submit
}) => {
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState('write')
  return (
    <div className='MarkdownEditor'>
      <Tabs
        onChange={setCurrentTab}
        type='card'
        className='MarkdownEditor__tabs'
        defaultActiveKey='write'
      >
        <TabPane tab={t('MarkdownEditor.write')} key='write'>
          <div className='MarkdownEditor__wrapper'>
            <TextArea
              className='MarkdownEditor__input'
              value={value}
              onChange={onChange}
            />
            {submit}
          </div>
        </TabPane>
        <TabPane tab={t('MarkdownEditor.preview')} key='preview'>
          <div className='MarkdownEditor__wrapper'>
            <div className='MarkdownEditor__preview'>
              <MemoMarkdown value={value || t('MarkdownEditor.empty')} shouldUpdate={currentTab === 'preview'} />
            </div>
            {submit}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
