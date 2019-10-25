import React from 'react'
import { View, view, useAction, useMessages, useQuery } from 'app'
import { CenterContent, LinkButton } from 'components'
import { Formik } from 'forms'
import { resetPasswordSchema, RESET_PASSWORD, GET_RESET_PASSWORD_TOKEN_STATE } from './forgotPassword.api'
import { ResetPasswordForm } from './ResetPasswordForm'
import { Result, Icon } from 'antd'
import { useTranslation } from 'react-i18next'

export const ResetPasswordRoute: View = ({ router, match }) => {
  const { resetToken } = match.params
  const { isValid, email } = useQuery(GET_RESET_PASSWORD_TOKEN_STATE, { resetToken }).read()
  const { t } = useTranslation()
  const resetPassword = useAction(RESET_PASSWORD)
  const messages = useMessages()
  return (
    <CenterContent width={isValid ? 'small' : 'default'}>
      {isValid
        ? (
          <Formik
            validationSchema={resetPasswordSchema}
            onSubmit={async ({ newPassword }, actions) => {
              try {
                await resetPassword({ resetToken, newPassword })
                messages.success('Password has been reset.')
                router.replace(`/user/login`)
              } finally {
                actions.setSubmitting(false)
              }
            }}
            initialValues={{
              email,
              newPassword: '',
              resetToken
            }}
          >
            <ResetPasswordForm email={email!} />
          </Formik>
        ) : (
          <Result
            status='error'
            title={t('ResetPasswordError.title')}
            subTitle={t('ResetPasswordError.subtitle')}
            extra={
              <LinkButton type='primary' to='/'>{t('RouteError.back')}</LinkButton>
            }
          />
        )}
    </CenterContent>
  )
}

export default view(ResetPasswordRoute)
