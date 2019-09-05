import React from 'react'
import { View, redirect, allow, useAction } from 'app'
import { Formik } from 'forms'
import { RegisterForm } from './RegisterForm'
import { REGISTER, registerSchema, RegisterParams } from './register.api'
import { CenterContent } from 'components'

const initial: RegisterParams = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export const RegisterRoute: View = () => {
  const register = useAction(REGISTER)
  return (
    <CenterContent width='small'>
      <Formik
        validationSchema={registerSchema}
        onSubmit={async (values, actions) => {
          try {
            await register(values)
            // todo
          } finally {
            actions.setSubmitting(false)
          }
        }}
        initialValues={initial}
      >
        <RegisterForm />
      </Formik>
    </CenterContent>
  )
}

RegisterRoute.onEnter = ({
  app: { user }
}) => {
  if (user.authenticated) {
    return redirect('/')
  }

  return allow()
}
