/* eslint-disable react/jsx-pascal-case */

import { Select as $Select } from 'antd'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { SelectProps as $SelectProps, OptionProps } from 'antd/lib/select'
import { FormikFieldProps } from './FieldProps'

function onlyUnique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index
}

function getEmails(str: string) {
  return str.match(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gim) || []
}

function mapEmails(value: undefined | string | string[]) {
  if (typeof value === 'string') {
    return getEmails(value)[0]
  } else if (Array.isArray(value)) {
    return value.flatMap(getEmails).filter(onlyUnique)
  } else {
    return value
  }
}

export type EmailSelectProps = FormikFieldProps & $SelectProps<any> & { children: React.ReactNode }

export const EmailSelect = ({
  name,
  validate,
  children,
  mode = 'tags',
  allowClear = true,
  maxTagCount = 50,
  tokenSeparators = [',', ';', '\n', '\r\n', ' '],
  ...restProps
}: EmailSelectProps) => {
  return (
    <Field name={name} validate={validate}>
      {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
        <$Select
          allowClear={allowClear}
          mode={mode}
          tokenSeparators={tokenSeparators}
          maxTagCount={maxTagCount}
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
