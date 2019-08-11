import React, { FunctionComponent } from 'react'
import { Link } from '@pema/router-react'
import { Card } from 'antd'
import { Form, Input, Icon, Checkbox, SubmitButton } from 'forms'
import './LoginForm.css'

interface LoginFormProps {
  error?: string | null
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({
  error
}) => {
  return (
    <Card
      className='LoginForm'
      bodyStyle={{ padding: 0 }}
    >
      <Form
        className='LoginForm__form'
        showCaptcha
      >
        <h2>Log in</h2>
        {error && <div className='LoginForm__error'>{error}</div>}
        <Form.Item name='username'>
          <Input
            name='username'
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
        <Form.AntdItem>
          <Checkbox name='persist'>Remember me</Checkbox>
          <a className='LoginForm__forgot' href='#'>Forgot password</a>
          <SubmitButton
            preventDisabling
            block
            className='LoginForm__submit'
          >
            Log in
          </SubmitButton>
          Or <Link to='/user/register'>register now!</Link>
        </Form.AntdItem>
      </Form>
    </Card>
  )
}
