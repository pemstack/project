import { useApp, useEvent } from '@pema/app-react'
import { RouterView } from '@pema/router'
import DefaultLayout from 'app/layout/DefaultLayout'
import { App, LayoutPicker, RouteParams, View } from 'app/types'
import React, { ComponentType, FunctionComponent } from 'react'
import Error from './Error'
import Loading from './Loading'

const NoLayout: FunctionComponent<RouteParams> = ({ children }) => <>{children}</>

function getLayout(params: RouteParams, type: LayoutPicker = 'default'): [ComponentType<RouteParams>, {}] {
  if (typeof type === 'function') {
    type = type(params)
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

interface CatcherProps {
  view: RouterView
  params: RouteParams
}

interface CatcherState {
  error: any
}

class Catcher extends React.Component<CatcherProps, CatcherState> {
  static getDerivedStateFromError(error: any) {
    return { error }
  }

  constructor(props: CatcherProps) {
    super(props)
    this.state = { error: null }
  }

  componentDidUpdate(prevProps: CatcherProps) {
    if (this.state.error !== null && prevProps.view !== this.props.view) {
      this.setState({ error: null })
    }
  }

  render() {
    const { error } = this.state
    if (error) {
      const { params } = this.props
      return <Error {...params} code={500} error={error} />
    }

    return this.props.children
  }
}

const Router: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('router.view')
  useEvent('render')

  const { router } = app
  const view = router.view
  const params: RouteParams = router.current as any
  if (!view) {
    return <DefaultLayout {...params} />
  }

  switch (view.type) {
    case 'view':
      const ViewComponent = view.view as View
      const [ViewLayout, viewLayoutProps] = getLayout(params, ViewComponent.layout)
      const initialProps = params.state.props || {}
      const derivedProps = deriveProps(ViewComponent, params)
      return (
        <ViewLayout {...params} {...viewLayoutProps}>
          <Catcher params={params} view={view}>
            <ViewComponent {...params} {...initialProps} {...derivedProps} />
          </Catcher>
        </ViewLayout>
      )
    case 'error':
      return (
        <DefaultLayout {...params}>
          <Error {...params} code={view.code} error={view.error} />
        </DefaultLayout>
      )
    case 'fallback':
      if (typeof view.fallback === 'string') {
        return (
          <DefaultLayout {...params}>
            {view.fallback}
          </DefaultLayout>
        )
      }

      const Fallback = (view.fallback && view.fallback !== true) ? view.fallback : Loading
      const [FallbackLayout, fallbackLayoutProps] = getLayout(params, Fallback.layout)
      return (
        <FallbackLayout {...params} {...fallbackLayoutProps}>
          <Fallback {...params} />
        </FallbackLayout>
      )
    default:
      return null
  }
}

export default Router
