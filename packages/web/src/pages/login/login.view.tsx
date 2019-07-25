import React from 'react'
import { Formik, Form, Input, Checkbox, SubmitButton, Icon, FormikActions } from 'forms'
import { View } from 'app'

export const LoginView: View = () => {
  function submit(values: any, actions: FormikActions<any>) {
    console.log(values)
    actions.setSubmitting(false)
  }

  return (
    <div className='Login'>
      <Formik
        onSubmit={submit}
        initialValues={{
          username: '',
          password: '',
          persist: false
        }}
        render={() => (
          <Form>
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
            <Checkbox name='persist'>Remember me</Checkbox>
            <SubmitButton>Log in</SubmitButton>
            <a className='login-form-forgot' href='#'>Forgot password</a>
            Or <a href='#'>register now!</a>
          </Form>
        )}
      />
    </div>
  )
}
