import React from 'react'
import { View, useAction, view } from 'app'
import { CenterContent } from 'components'
import { Formik } from 'forms'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { INITIATE_PASSWORD_RESET } from './forgotPassword.api'

export const ForgotPasswordRoute: View = ({ router }) => {
  const initiatePasswordReset = useAction(INITIATE_PASSWORD_RESET)
  return (
    <CenterContent width='small'>
      <Formik
        validationSchema={initiatePasswordReset.schema}
        onSubmit={async (values, actions) => {
          try {
            await initiatePasswordReset(values)
            router.replace(`/user/forgot-password/sent`)
          } finally {
            actions.setSubmitting(false)
          }
        }}
        initialValues={{
          email: ''
        }}
      >
        <ForgotPasswordForm />
      </Formik>
    </CenterContent>
  )
}

export default view(ForgotPasswordRoute)
