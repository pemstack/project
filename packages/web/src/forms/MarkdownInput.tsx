import React from 'react'
import { Field, FieldProps } from 'formik'
import { FormikFieldProps } from './FieldProps'
import { MarkdownEditor } from 'components'

export const MarkdownInput: React.FunctionComponent<FormikFieldProps> = ({
  name,
  validate,
  ...restProps
}) => (
  <Field name={name} validate={validate}>
    {({ field: { value, onChange, onBlur } }: FieldProps) => (
      <MarkdownEditor
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...restProps}
      />
    )}
  </Field>
)
