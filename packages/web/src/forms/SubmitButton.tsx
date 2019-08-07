/* eslint-disable react/jsx-pascal-case */

import { Button } from 'antd'
import { Field, FieldProps } from 'formik'
import React from 'react'
import { ButtonProps } from 'antd/lib/button'

export type SubmitButtonProps = ButtonProps & {
  onSuccess?: () => void
  preventDisabling?: boolean
}

export const SubmitButton = ({
  children,
  onSuccess,
  preventDisabling,
  ...restProps
}: SubmitButtonProps) => (
    <Field>
      {({ form: { isSubmitting, isValid } }: FieldProps) => (
        <Button
          loading={isSubmitting}
          disabled={!preventDisabling && !isValid || isSubmitting}
          type='primary'
          htmlType='submit'
          {...restProps}
        >
          {children}
        </Button>
      )}
    </Field>
  )
