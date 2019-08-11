import React from 'react'
import { View, redirect, allow, stringParam, useAction } from 'app'
import { Button } from 'antd'
import { LOGOUT } from 'api/user.api'

export const LogoutView: View = ({
  router,
  location
}) => {
  const logoutAction = useAction(LOGOUT)
  async function logout() {
    await logoutAction()
    const path = stringParam(location.query, 'redirect', '/')
    router.replace(path, true)
  }

  return (
    <div className='LogoutView'>
      Click here to log out <Button type='danger' onClick={logout}>Log out</Button>
    </div>
  )
}

LogoutView.onEnter = ({
  app: { user },
  location: { query }
}) => {
  if (!user.authenticated) {
    const path = stringParam(query, 'redirect', '/')
    return redirect(path)
  }

  return allow()
}
