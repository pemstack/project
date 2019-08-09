import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider, decorator } from 'app/mock'
import { Formik } from 'forms'
import { RegisterForm } from './RegisterForm'

storiesOf('RegisterForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <AppProvider>
      <Formik
        onSubmit={(props, actions) => {
          action('submit')()
          actions.setSubmitting(false)
        }}
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <RegisterForm />
        </div>
      </Formik>
    </AppProvider>
  ))
