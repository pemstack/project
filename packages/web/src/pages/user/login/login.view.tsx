import React, { useState } from 'react'
import { Formik, Form, Input, Checkbox, SubmitButton, Icon, FormikActions } from 'forms'
import { View, redirect, allow, stringParam, errorCode, useAction } from 'app'
import { LOGIN, LoginParams } from 'api/user.api'
import { Card } from 'antd'
import './login.view.css'

export const LoginView: View = ({
  router,
  location
}) => {
  const login = useAction(LOGIN)
  const [error, setError] = useState<string | null>(null)

  async function submit(values: LoginParams, actions: FormikActions<LoginParams>) {
    try {
      await login(values)
      const path = stringParam(location.query, 'redirect', '/')
      router.replace(path, true)
    } catch (e) {
      if (errorCode(e) === 401) {
        setError('Invalid username or password.')
      } else {
        setError('Could not log in.')
      }

      actions.setFieldValue('password', '', false)
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <div className='Login'>
      <Card className='Login__card'>
        <h2>Log in</h2>
        <Formik
          validationSchema={login.schema}
          onSubmit={submit}
          initialValues={{
            username: '',
            password: '',
            persist: false
          }}
          render={() => (
            <Form showCaptcha>
              {error && <div className='Login__error'>{error}</div>}
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
              <Form.Item name='persist'>
                <Checkbox name='persist'>Remember me</Checkbox>
              </Form.Item>
              <SubmitButton
                preventDisabling
                className='Login__submit'
              >
                Log in
              </SubmitButton>
              <br />
              <a className='login-form-forgot' href='#'>Forgot password</a>
              Or <a href='#'>register now!</a>
            </Form>
          )}
        />
      </Card>
    </div>
  )
}

LoginView.layout = {
  type: 'none'
}

LoginView.onEnter = ({
  app: { user },
  location: { query }
}) => {
  if (user.authenticated) {
    const path = stringParam(query, 'redirect', '/')
    return redirect(path)
  }

  return allow()
}
