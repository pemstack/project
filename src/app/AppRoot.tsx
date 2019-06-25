import { AppContext, useApp, useEvent } from '@pema/app-react'
import React, { ComponentType, FunctionComponent } from 'react'
import ErrorView from './ErrorView'
import LoadingView from './LoadingView'
import { App } from './types'

interface AppRootProps {
  app: App
}

const Router: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('router.view')
  const router = app.router
  const { view, current } = router
  console.log('Views', view)
  if (!view) {
    return null
  }

  switch (view.type) {
    case 'view':
      const View = view.view as ComponentType<typeof current>
      return <View {...current} />
    case 'error':
      return <ErrorView code={view.code} error={view.error} />
    case 'fallback':
      return view.fallback || <LoadingView />
    default:
      return null
  }
}

const AppRoot: FunctionComponent<AppRootProps> = ({ app }) => {
  return (
    <AppContext.Provider value={app}>
      <div className='App'>
        <Router />
      </div>
    </AppContext.Provider>
  )
}

export default AppRoot
