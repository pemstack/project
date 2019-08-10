/* eslint-disable react/jsx-pascal-case */

import React from 'react'
import get from 'lodash.get'
import { Field, FieldProps } from 'formik'
import { Form } from 'antd'
import { FormItemProps as $FormItemProps } from 'antd/lib/form/FormItem'
import { useTranslation } from 'react-i18next'

export type FormItemProps =
  { showValidateSuccess?: boolean; children: React.ReactNode }
  & { name: string }
  & $FormItemProps

export const FormItem = ({ name, showValidateSuccess, children, ...restProps }: FormItemProps) => {
  const { t } = useTranslation()
  return (
    <Field name={name}>
      {({ form: { errors = {}, touched = {} } }: FieldProps) => {
        const error = get(errors, name, undefined)
        const isTouched = get(touched, name, false) as boolean
        const hasError = error !== undefined && isTouched
        const isValid = !error && isTouched
        return (
          <Form.Item
            validateStatus={hasError ? 'error' : (isValid && showValidateSuccess) ? 'success' : undefined}
            hasFeedback={isValid}
            help={(hasError && <li>{typeof error === 'string' ? t(error) : error}</li>) || (isValid && '')}
            {...restProps}
          >
            {children}
          </Form.Item>
        )
      }}
    </Field>
  )
}
