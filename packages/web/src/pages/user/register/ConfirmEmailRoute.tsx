import { View, viewInvariant, useAction, view } from 'app'
import { Loading } from 'app/components'
import React, { FunctionComponent, useState, useEffect } from 'react'
import { Result, Button } from 'antd'
import { LinkButton } from 'components'
import { CONFIRM_EMAIL } from './register.api'

enum State {
  Pending,
  Success,
  Error
}

export const ConfirmEmailRoute: View = ({ match }) => {
  const { confirmToken } = match.params
  viewInvariant(confirmToken, 404)

  const confirm = useAction(CONFIRM_EMAIL)
  const [confirmState, setConfirmState] = useState(State.Pending)
  useEffect(() => {
    setConfirmState(State.Pending)
  }, [confirmToken])

  useEffect(() => {
    if (confirmState !== State.Pending) {
      return
    }

    let cancel = false
    async function performConfirm() {
      try {
        await confirm({ confirmToken })
        if (!cancel) {
          setConfirmState(State.Success)
        }
      } catch {
        if (!cancel) {
          setConfirmState(State.Error)
        }
      }
    }

    return () => {
      cancel = true
    }
  }, [confirmState, confirmToken])

  switch (confirmState) {
    case State.Success:
      return <ConfirmEmailSuccess />
    case State.Error:
      return <ConfirmEmailError />
    case State.Pending:
    default:
      return <Loading />
  }
}

export const ConfirmEmailSuccess: FunctionComponent = ({}) => {
  return (
    <Result
      status='success'
      title='Email confirmed'
      subTitle='You may now log in with your email.'
      extra={
        <LinkButton to='/user/login' type='primary'>
          Log In
        </LinkButton>
      }
    />
  )
}

export const ConfirmEmailError: FunctionComponent = ({}) => {
  return (
    <Result
      status='warning'
      title='Email confirmed'
      subTitle='You may now log in with your email.'
      extra={
        <LinkButton to='/' type='primary'>
          Back to Home
        </LinkButton>
      }
    />
  )
}

export default view(ConfirmEmailRoute)
