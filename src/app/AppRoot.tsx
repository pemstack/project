import { AppContext, useApp, useEvent } from '@pema/app-react'
import React, { ComponentType, FunctionComponent } from 'react'
import Error from './Error'
import Loading from './Loading'
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
      return <Error code={view.code} error={view.error} />
    case 'fallback':
      const Fallback = view.fallback || Loading
      return <Fallback />
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
