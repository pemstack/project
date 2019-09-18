/* eslint-disable react/jsx-pascal-case */

import { Select as $Select } from 'antd'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { SelectProps as $SelectProps, OptionProps } from 'antd/lib/select'
import { FormikFieldProps } from './FieldProps'

function getEmail(str: string) {

  return str
}

function mapEmails(value: undefined | string | string[]) {
  if (typeof value === 'string') {
    return getEmail(value)
  } else if (Array.isArray(value)) {
    return value.map(getEmail)
  } else {
    return value
  }
}

export type EmailSelectProps = FormikFieldProps & $SelectProps<any> & { children: React.ReactNode }

export const EmailSelect = ({ name, validate, children, ...restProps }: EmailSelectProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
        <$Select
          onChange={(v: any) => setFieldValue(name, mapEmails(v))}
          onBlur={() => setFieldTouched(name)}
          value={value}
          {...restProps}
        >
          {children}
        </$Select>
      )}
    </Field>
  )
}

type Option = OptionProps & { label: React.ReactNode | string | number }

EmailSelect.renderOptions = (options: Option[]) =>
  options.map(({ label, ...restProps }, index) => (
    <$Select.Option key={`select-option-${index}`} {...restProps}>
      {label}
    </$Select.Option>
  ))

EmailSelect.Option = $Select.Option
EmailSelect.OptGroup = $Select.OptGroup
