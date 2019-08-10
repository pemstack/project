import React, { FunctionComponent } from 'react'
import { Form, Input, SubmitButton } from 'forms'
import { Card } from 'antd'
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

export const RegisterForm: FunctionComponent = () => {
  const { t } = useTranslation()
  return (
    <div className='RegisterForm'>
      <Card className='RegisterForm__card'>
        <h2>Register</h2>
        <Form
          showCaptcha
          labelCol={formLabelCol}
          wrapperCol={formWrapperCol}
        >
          <Form.Item
            name='firstName'
            label={t('register.label.firstName')}
          >
            <Input
              name='firstName'
              type='text'
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item
            name='lastName'
            label={t('register.label.lastName')}
          >
            <Input
              name='lastName'
              type='text'
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item
            name='email'
            label={t('register.label.email')}
          >
            <Input
              name='email'
              type='text'
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item
            name='password'
            label={t('register.label.password')}
          >
            <Input.Password
              name='password'
              type='password'
              spellCheck={false}
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label={t('register.label.confirmPassword')}
          >
            <Input.Password
              name='confirmPassword'
              type='password'
              spellCheck={false}
            />
          </Form.Item>
          <Form.AntdItem wrapperCol={tailWrapperCol}>
            <SubmitButton
              preventDisabling
              className='RegisterForm__submit'
            >
              Register
            </SubmitButton>
          </Form.AntdItem>
        </Form>
      </Card>
    </div>
  )
}
