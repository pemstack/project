import React, { FunctionComponent } from 'react'
import { Form, Icon, Input, SubmitButton } from 'forms'
import { Card, Tooltip } from 'antd'

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
            name='email'
            label={
              <span>
                Nickname&nbsp;
                  <Tooltip title='What do you want others to call you?'>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
          >
            <Input
              name='email'
              prefix={<Icon type='email' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='text'
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item name='username'>
            <Input
              name='username'
              type='text'
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item name='password'>
            <Input
              name='password'
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item name='confirmPassword'>
            <Input
              name='confirmPassword'
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
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
