import React from 'react'
import { View, redirect, allow, useAction } from 'app'
import { Formik, Form } from 'forms'
import { RegisterForm } from './RegisterForm'
import { REGISTER, registerSchema, RegisterParams } from './register.api'

const initial: RegisterParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const RegisterView: View = () => {
  const register = useAction(REGISTER)
  return (
    <Formik
      validationSchema={registerSchema}
      onSubmit={async (values, actions) => {
        try {
          await register(values)
        } finally {
          actions.setSubmitting(false)
        }
      }}
      initialValues={initial}
    >
      <RegisterForm />
    </Formik>
  )
}

RegisterView.onEnter = ({
  app: { user }
}) => {
  if (user.authenticated) {
    return redirect('/')
  }

  return allow()
}
