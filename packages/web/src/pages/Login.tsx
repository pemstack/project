import { Button, Checkbox, Form, Icon, Input } from 'antd'
import { View } from 'app'
import Links from 'components/Links'
import React from 'react'

const Login: View = () => {
  return (
    <div style={{ margin: '0 auto', maxWidth: 300 }}>
      <Links />
      <Form.Item>
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Checkbox>Remember me</Checkbox>
        <a className='login-form-forgot' href=''>Forgot password</a>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
        Or <a href=''>register now!</a>
      </Form.Item>
    </div>
  )
}

export default Login
