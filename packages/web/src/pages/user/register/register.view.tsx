import React from 'react'
import { View, redirect, allow } from 'app'
import { Formik, Form } from 'forms'

export const RegisterView: View = ({ }) => {
  return (
    <div className='Register'>
      Register page
    </div>
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
