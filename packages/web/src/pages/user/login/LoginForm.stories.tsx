import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider } from 'app/mock'
import { Formik } from 'forms'
import { LoginForm } from './LoginForm'
import * as yup from 'yup'

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  persist: yup.boolean().notRequired()
})

storiesOf('LoginForm', module)
  .addDecorator(story => (
    <div
      style={{
        background: '#eee',
        padding: '32px'
      }}
    >
      {story()}
    </div>
  ))
  .add('default', () => (
    <AppProvider>
      <Formik
        validationSchema={loginSchema}
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={{
          username: '',
          password: '',
          persist: false
        }}
      >
        <div style={{ maxWidth: '360px', margin: '0 auto' }}>
          <LoginForm />
        </div>
      </Formik>
    </AppProvider>
  ))
