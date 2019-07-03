import { useApp, useEvent } from '@pema/app-react'
import DefaultLayout from 'app/layout/DefaultLayout'
import { App, LayoutPicker, RouteParams, View } from 'app/types'
import React, { ComponentType, FunctionComponent } from 'react'
import Error from './Error'
import Loading from './Loading'

const NoLayout: FunctionComponent<RouteParams> = ({ children }) => <>{children}</>

function getLayout(props: RouteParams, type: LayoutPicker = 'default'): [ComponentType<RouteParams>, {}] {
  if (typeof type === 'function') {
    type = type(props)
  }

  if (type === null || type === 'none') {
    return [NoLayout, {}]
  }

  if (typeof type === 'string') {
    type = { type }
  }

  const { type: key, ...layoutProps } = type

  switch (key) {
    case 'none':
      return [NoLayout, {}]
    case 'default':
    default:
      return [DefaultLayout, layoutProps]
  }
}

function deriveProps(view: View, params: RouteParams) {
  if (view && typeof view.deriveProps === 'function') {
    return view.deriveProps(params) || {}
  } else {
    return {}
  }
}

const Router: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('router.view')
  useEvent('render')
  const router = app.router
  const view = router.view
  const props: RouteParams = router.current as any
  if (!view) {
    return <DefaultLayout {...props} />
  }

  switch (view.type) {
    case 'view':
      const ViewComponent = view.view as View
      const [ViewLayout, viewLayoutProps] = getLayout(props, ViewComponent.layout)
      const derivedProps = deriveProps(ViewComponent, props)
      return (
        <ViewLayout {...props} {...viewLayoutProps}>
          <ViewComponent {...derivedProps} {...props} />
        </ViewLayout>
      )
    case 'error':
      return (
        <DefaultLayout {...props}>
          <Error {...props} code={view.code} error={view.error} />
        </DefaultLayout>
      )
    case 'fallback':
      if (typeof view.fallback === 'string') {
        return (
          <DefaultLayout {...props}>
            {view.fallback}
          </DefaultLayout>
        )
      }

      const Fallback = (view.fallback && view.fallback !== true) ? view.fallback : Loading
      const [FallbackLayout, fallbackLayoutProps] = getLayout(props, Fallback.layout)
      return (
        <FallbackLayout {...props} {...fallbackLayoutProps}>
          <Fallback {...props} />
        </FallbackLayout>
      )
    default:
      return null
  }
}

export default Router
