import { AppContext } from '@pema/app-react'
import { Router } from 'app/components'
import { App } from 'app/types'
import React, { FunctionComponent } from 'react'

interface AppRootProps {
  app: App
}

const AppRoot: FunctionComponent<AppRootProps> = ({ app }) => {
  return (
    <AppContext.Provider value={app}>
      <div className='AppRoot'>
        <Router />
      </div>
    </AppContext.Provider>
  )
}

export default AppRoot
