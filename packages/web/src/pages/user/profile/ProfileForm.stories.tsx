import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AppProvider, decorator } from 'app/mock'
import { ProfileForm } from './ProfileForm'
import { Formik } from 'forms'

storiesOf('ProfileForm', module)
  .addDecorator(decorator())
  .add('default', () => (
    <Formik
      onSubmit={(props, actions) => {
        action('submit')()
        actions.setSubmitting(false)
      }}
      initialValues={{
        firstName: ''
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ProfileForm />

      </div>
    </Formik>
  ))
