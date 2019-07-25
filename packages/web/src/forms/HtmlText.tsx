/* eslint-disable react/jsx-pascal-case */

import { Field, FieldProps } from 'formik'
import React from 'react'

export const HtmlText = (props: { name: string }) => (
  <Field {...props}>
    {({ field }: FieldProps) => field.value}
  </Field>
)
