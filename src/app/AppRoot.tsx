import { AppContext, useApp, useEvent } from '@pema/app-react'
import React, { ComponentType, FunctionComponent } from 'react'
import Error from './components/Error'
import Loading from './components/Loading'
import { App } from './types'

interface AppRootProps {
  app: App
}

const Router: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('router.view')
  const router = app.router
  const { view, current } = router

  if (!view) {
    return null
  }

  switch (view.type) {
    case 'view':
      const View = view.view as ComponentType<typeof current>
      return <View {...current} />
    case 'error':
      return <Error code={view.code} error={view.error} />
    case 'fallback':
      if (typeof view.fallback === 'string') {
        return <div>{view.fallback}</div>
      }

      const Fallback = view.fallback || Loading
      return <Fallback />
    default:
      return null
  }
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
