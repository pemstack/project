import { AppContext } from '@pema/app-react'
import React, { FunctionComponent, Suspense } from 'react'
import { Router } from 'app/components'
import { App } from 'app/types'
import { Spin } from 'antd'
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
        <Suspense
          fallback={
            <div className='AppRoot__loading'>
              <Spin size='large' />
            </div>
          }
        >
          {children || <Router />}
        </Suspense>
      </div>
    </AppContext.Provider>
  )
}
