import React from 'react'
import { View, redirect, allow, stringParam, useAction } from 'app'
import { Button, Card } from 'antd'
import { LOGOUT } from 'api/user.api'
import { useTranslation } from 'react-i18next'
import './LogoutRoute.css'

export const LogoutRoute: View = ({
  location
}) => {
  const { t } = useTranslation()
  const logoutAction = useAction(LOGOUT)
  async function logout() {
    const path = stringParam(location.query, 'redirect', '/')
    await logoutAction(path)
  }

  return (
    <div className='LogoutView'>
      <Card>
        <span className='LogoutView__text'>
          {t('text.confirm')}
        </span>
        <Button
          className='LogoutView__button'
          type='danger'
          onClick={logout}
        >
          {t('user.label.logout')}
        </Button>
      </Card>
    </div>
  )
}

LogoutRoute.onEnter = ({
  app: { user },
  location: { query }
}) => {
  if (!user.authenticated) {
    const path = stringParam(query, 'redirect', '/')
    return redirect(path)
  }

  return allow()
}
