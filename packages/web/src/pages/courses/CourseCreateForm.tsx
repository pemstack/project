import React, { FunctionComponent } from 'react'
import { Form, Input, SubmitButton, Radio } from 'forms'
import { CollapseCard } from 'components'
import { useTranslation } from 'react-i18next'
import { Tooltip, Icon } from 'antd'

interface CourseCreateFormProps { }

export const CourseCreateForm: FunctionComponent<
  CourseCreateFormProps
> = () => {
  const { t } = useTranslation()
  return (
    <CollapseCard className='CreateCourseForm'>
      <Form
        layout='vertical'
        className='CreateCourseForm__form'
        showCaptcha
      >
        <h2>{t('CourseCreateForm.title')}</h2>
        <Form.Item name='title' label={t('CourseCreateForm.label.title')}>
          <Input name='title' type='text' spellCheck={false} />
        </Form.Item>
        <Form.Item name='access' label={t('CourseCreateForm.label.access')}>
          <Radio.Group
            name='access'
            options={[
              { label: t('CourseCreateForm.option.private'), value: 'private' },
              { label: t('CourseCreateForm.option.public'), value: 'public' }
            ]}
          />
          <Tooltip title={t('CourseCreateForm.tooltip')} placement='right'>
            <Icon type='question-circle' />
          </Tooltip>
        </Form.Item>
        <Form.AntdItem>
          <SubmitButton style={{ width: '100%' }} preventDisabling className='CreateCourseForm__submit'>
            {t('button.create')}
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </CollapseCard>
  )
}
