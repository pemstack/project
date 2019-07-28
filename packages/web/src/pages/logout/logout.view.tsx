import React from 'react'
import { View, redirect, allow, stringParam } from 'app'
import { Button } from 'antd'

export const LogoutView: View = ({
  app,
  location
}) => {
  async function logout() {
    await app.user.logout()
    const path = stringParam(location.query, 'redirect', '/')
    app.router.replace(path, true)
  }

  return (
    <div className='Logout'>
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
