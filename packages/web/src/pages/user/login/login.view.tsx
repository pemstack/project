import React, { useState } from 'react'
import { Formik, Form, Input, Checkbox, SubmitButton, Icon, FormikActions } from 'forms'
import { View, redirect, allow, stringParam, errorCode, useAction } from 'app'
import { LOGIN, LoginParams } from 'api/user.api'
import { Card } from 'antd'
import './login.view.css'
import { LoginForm } from './LoginForm'

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
    <div className='LoginView'>
      <Formik
        validationSchema={login.schema}
        onSubmit={submit}
        initialValues={{
          username: '',
          password: '',
          persist: false
        }}
        render={() => (
          <LoginForm error={error} />
        )}
      />
    </div>
  )
}

LoginView.layout = {
  type: 'minimal'
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
