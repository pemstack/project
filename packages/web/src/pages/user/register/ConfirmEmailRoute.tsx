import { View, viewInvariant, useAction, view } from 'app'
import { Loading } from 'app/components'
import React, { FunctionComponent, useState, useEffect } from 'react'
import { Result } from 'antd'
import { LinkButton } from 'components'
import { CONFIRM_EMAIL } from './register.api'
import { useTranslation } from 'react-i18next'

enum State {
  Pending,
  Success,
  Error
}

export const ConfirmEmailRoute: View = ({ match }) => {
  const { registerToken } = match.params
  viewInvariant(registerToken, 404)

  const confirm = useAction(CONFIRM_EMAIL)
  const [confirmState, setConfirmState] = useState(State.Pending)
  useEffect(() => {
    setConfirmState(State.Pending)
  }, [registerToken])

  useEffect(() => {
    if (confirmState !== State.Pending) {
      return
    }

    let cancel = false
    async function performConfirm() {
      try {
        await confirm({ registerToken })
        if (!cancel) {
          setConfirmState(State.Success)
        }
      } catch (e) {
        if (!cancel) {
          setConfirmState(State.Error)
        }
      }
    }

    performConfirm()
    return () => {
      cancel = true
    }
  }, [confirmState, registerToken])

  switch (confirmState) {
    case State.Success:
      return (
        <ConfirmEmailSuccess />
      )
    case State.Error:
      return (
        <ConfirmEmailError />
      )
    case State.Pending:
    default:
      return (
        <Loading />
      )
  }
}

export const ConfirmEmailSuccess: FunctionComponent = ({ }) => {
  const { t } = useTranslation()
  return (
    <Result
      status='success'
      title={t('ConfirmEmail.success.title')}
      subTitle={t('ConfirmEmail.success.subtitle')}
      extra={
        <LinkButton to='/user/login' type='primary'>
          {t('ConfirmEmail.success.login')}
        </LinkButton>
      }
    />
  )
}

export const ConfirmEmailError: FunctionComponent = ({ }) => {
  const { t } = useTranslation()
  return (
    <Result
      status='error'
      title={t('ConfirmEmail.error.title')}
      subTitle={t('ConfirmEmail.error.subtitle')}
      extra={
        <LinkButton to='/' type='primary'>
          {t('ConfirmEmail.error.back')}
        </LinkButton>
      }
    />
  )
}

export default view(ConfirmEmailRoute)
