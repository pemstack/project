import React, { FunctionComponent } from 'react'
import { Form, Input, SubmitButton, Radio } from 'forms'
import { CollapseCard } from 'components'
import { useTranslation } from 'react-i18next'

const formLabelCol = {
  xs: { span: 24 },
  sm: { span: 8 }
}

const formWrapperCol = {
  xs: { span: 24 },
  sm: { span: 16 }
}

const tailWrapperCol = {
  xs: {
    span: 24,
    offset: 0,
  },
  sm: {
    span: 16,
    offset: 8,
  }
}

interface CourseCreateFormProps {

}

export const CourseCreateForm: FunctionComponent<CourseCreateFormProps> = () => {
  const { t } = useTranslation()
  return (
    <CollapseCard
      className='CreateCourseForm'
    >
      <Form
        className='CreateCourseForm__form'
        showCaptcha
        labelCol={formLabelCol}
        wrapperCol={formWrapperCol}
      >
        <h2>{t('CourseCreateForm.title')}</h2>
        <Form.Item
          name='title'
          label={t('CourseCreateForm.label.title')}
        >
          <Input
            name='title'
            type='text'
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name='access'
          label={t('CourseCreateForm.label.access')}
        >
          <Radio.Group
            name='access'
            options={[
              { label: t('CourseCreateForm.option.private'), value: 'private' },
              { label: t('CourseCreateForm.option.public'), value: 'public' }
            ]}
          />
        </Form.Item>
        <Form.AntdItem wrapperCol={tailWrapperCol}>
          <SubmitButton
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
