import { AppContext } from '@pema/app-react'
import { Router } from 'app/components'
import { App } from 'app/types'
import React, { FunctionComponent } from 'react'
import './AppRoot.css'

interface AppRootProps {
  app: App
}

export const AppRoot: FunctionComponent<AppRootProps> = ({ app }) => {
  return (
    <AppContext.Provider value={app}>
      <div className='AppRoot'>
        <Router />
      </div>
    </AppContext.Provider>
  )
}
