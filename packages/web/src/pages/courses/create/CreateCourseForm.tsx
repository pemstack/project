import { Icon, Tooltip } from 'antd'
import { CollapseCard } from 'components'
import { Form, Input, Radio, SubmitButton } from 'forms'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

interface CreateCourseFormProps { }

export const CreateCourseForm: FunctionComponent<
  CreateCourseFormProps
> = () => {
  const { t } = useTranslation()
  return (
    <CollapseCard className='CreateCourseForm'>
      <Form layout='vertical' className='CreateCourseForm__form' showCaptcha>
        <h2>{t('CreateCourseForm.title')}</h2>
        <Form.Item name='title' label={t('CreateCourseForm.label.title')}>
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
        <Form.AntdItem>
          <SubmitButton
            style={{ width: '100%' }}
            preventDisabling
            className='CreateCourseForm__submit'
          >
            {t('button.create')}
          </SubmitButton>
        </Form.AntdItem>
      </Form>
    </CollapseCard>
  )
}
