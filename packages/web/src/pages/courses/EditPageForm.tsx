import React, { FunctionComponent } from 'react'
import { CollapseCard } from 'components'
import { Form, Input, Radio, SubmitButton, MarkdownInput } from 'forms'
import { Tooltip, Icon } from 'antd'
import { useTranslation } from 'react-i18next'
import './EditPageForm.css'

export const EditPageForm: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <CollapseCard className='EditPageForm'>
      <Form layout='vertical' className='EditPageForm__form'>
        <h2>{t('EditPageForm.title')}</h2>
        <Form.Item name='title' label={t('EditPageForm.label.title')}>
          <Input name='title' type='text' spellCheck={false} />
        </Form.Item>
        <Form.Item name='access' label={t('CreateCourseForm.label.access')}>
          <Radio.Group
            name='access'
            options={[
              { label: t('CreateCourseForm.option.private'), value: 'private' },
              { label: t('CreateCourseForm.option.public'), value: 'public' }
            ]}
          />
          <Tooltip title={t('CreateCourseForm.tooltip')} placement='right'>
            <Icon type='question-circle' />
          </Tooltip>
        </Form.Item>
        <Form.Item name='content'>
          <div>
            <MarkdownInput name='content' />
          </div>
        </Form.Item>
        <Form.AntdItem>
          <SubmitButton
            style={{ width: '100%' }}
            preventDisabling
            className='CreateCourseForm__submit'
          >
            {t('button.update')}
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </CollapseCard>
  )
}
