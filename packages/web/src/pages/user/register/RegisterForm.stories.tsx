import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { RegisterForm } from './RegisterForm'
import { AppProvider } from 'app/mock';
import { Formik } from 'forms'

storiesOf('RegisterForm', module)
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
