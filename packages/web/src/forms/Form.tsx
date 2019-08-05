/* eslint-disable react/jsx-pascal-case */

import React, { useEffect } from 'react'
import { Field, FieldProps } from 'formik'
import { Form as AntdForm } from 'antd'
import { FormProps as $FormProps } from 'antd/lib/form'
import { FormItem } from './FormItem'
import { useApp } from '@pema/app-react'
import { App } from 'app'

export interface FormProps extends $FormProps {
  showCaptcha?: boolean
}

export function Form(props: FormProps) {
  const { showCaptcha, ...rest } = props
  const { recaptcha } = useApp<App>()
  useEffect(() => {
    if (showCaptcha) {
      recaptcha.show()
      return () => recaptcha.hide()
    }
  }, [recaptcha, showCaptcha])

  return (
    <Field>
      {({ form: { handleReset, handleSubmit } }: FieldProps) => (
        <AntdForm onReset={handleReset} onSubmit={handleSubmit} {...rest} />
      )}
    </Field>
  )
}

Form.Item = FormItem
