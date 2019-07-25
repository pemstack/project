/* eslint-disable react/jsx-pascal-case */

import { Field } from 'formik'
import React from 'react'

export const isDevelopmentMode = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const FormikDebug = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) =>
  isDevelopmentMode() ? (
    <pre style={{ padding: 15, ...props }}>
      <Field>{({ form }: any) => JSON.stringify(form, null, 2)}</Field>
    </pre>
  ) : null
