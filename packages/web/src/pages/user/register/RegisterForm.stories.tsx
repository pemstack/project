import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider, decorator } from 'app/mock'
import { Formik } from 'forms'
import { RegisterForm } from './RegisterForm'
import { registerSchema, RegisterParams } from './register.api'

const initial: RegisterParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

storiesOf('user/register/RegisterForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <Formik
      validationSchema={registerSchema}
      onSubmit={(props, actions) => {
        action('submit')()
        actions.setSubmitting(false)
      }}
      initialValues={initial}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <RegisterForm />
      </div>
    </Formik>
  ))
