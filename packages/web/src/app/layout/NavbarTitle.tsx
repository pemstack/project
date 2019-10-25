import { useApp, useEvent } from '@pema/app-react'
import { App } from 'app'
import React, { FunctionComponent } from 'react'

export const NavbarTitle: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('config.navbarTitle')
  return <>{app.config.navbarTitle}</>
}
