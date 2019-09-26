import React, { FunctionComponent, useState } from 'react'
import { Tabs, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'
import { Placeholder } from './Placeholder'
import './MarkdownEditor.css'

const { TabPane } = Tabs
const { TextArea } = Input
const Markdown = React.lazy(() => import('components/Markdown'))

interface MemoMarkdownProps {
  value: string
  shouldUpdate: boolean
}

class MemoMarkdown extends React.Component<MemoMarkdownProps> {
  shouldComponentUpdate(newProps: MemoMarkdownProps) {
    return newProps.shouldUpdate
  }

  render() {
    return <Markdown source={this.props.value} />
  }
}

export interface MarkdownEditorProps {
  value: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  name?: string
  submit?: React.ReactNode
}

export const MarkdownEditor: FunctionComponent<MarkdownEditorProps> = ({
  value,
  onChange,
  submit,
  name
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
              name={name}
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
              <Suspense fallback={<Placeholder size='large' push block />}>
                <MemoMarkdown
                  value={value || t('MarkdownEditor.empty')}
                  shouldUpdate={currentTab === 'preview'}
                />
              </Suspense>
            </div>
            {submit}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
