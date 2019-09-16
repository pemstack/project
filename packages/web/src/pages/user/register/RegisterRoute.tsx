import React from 'react'
import { View, redirect, allow, useAction, view } from 'app'
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

export const RegisterRoute: View = ({ router }) => {
  const register = useAction(REGISTER)
  return (
    <CenterContent width='small'>
      <Formik
        validationSchema={registerSchema}
        onSubmit={async (values, actions) => {
          try {
            const { resendToken } = await register(values)
            router.replace(`/user/register/success/${resendToken}`)
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

RegisterRoute.onEnter = ({ app: { user } }) => {
  if (user.authenticated) {
    return redirect('/')
  }

  return allow()
}

export default view(RegisterRoute)
