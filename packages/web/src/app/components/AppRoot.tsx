import { AppContext } from '@pema/app-react'
import React, { FunctionComponent, Suspense } from 'react'
import { Router, DelayedLoading } from 'app/components'
import { App } from 'app/types'
import './AppRoot.css'

interface AppRootProps {
  app: App
  children?: React.ReactNode
}

export const AppRoot: FunctionComponent<AppRootProps> = ({
  app,
  children
}) => {
  return (
    <AppContext.Provider value={app}>
      <div className='AppRoot'>
        <Suspense fallback={<DelayedLoading />}>
          {children || <Router />}
        </Suspense>
      </div>
    </AppContext.Provider>
  )
}
