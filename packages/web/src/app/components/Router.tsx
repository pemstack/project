import { useApp, useEvent } from '@pema/app-react'
import { RouterView } from '@pema/router'
import { UserLayout } from 'app/layout/UserLayout'
import { AnonymousLayout } from 'app/layout/AnonymousLayout'
import { App, LayoutPicker, RouteParams, View } from 'app/types'
import React, { ComponentType, FunctionComponent, Suspense } from 'react'
import { Error } from './Error'
import { Loading } from './Loading'
import { Spin } from 'antd'

const NoLayout: FunctionComponent<RouteParams> = ({ children }) => <>{children}</>

function getLayout(params: RouteParams, type?: LayoutPicker): [ComponentType<any>, {}] {
  if (typeof type === 'function') {
    type = type(params)
  }

  if (typeof type === 'undefined') {
    type = params.app.user.authenticated ? 'user' : 'anonymous'
  }

  if (type === null) {
    return [NoLayout, {}]
  }

  let key: string
  let props: {}
  if (typeof type === 'string') {
    key = type
    props = {}
  } else {
    key = type.type
    props = type
  }

  switch (key) {
    case 'none':
      return [NoLayout, props]
    case 'anonymous':
      return [AnonymousLayout, props]
    case 'user':
    default:
      return [UserLayout, props]
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

export const Router: FunctionComponent = () => {
  const app = useApp<App>()
  useEvent('router.view')
  useEvent('render')

  const { router } = app
  const view = router.view
  const params: RouteParams = router.current as any
  if (!view) {
    return null
  }

  const Layout = app.user.authenticated ? UserLayout : AnonymousLayout
  switch (view.type) {
    case 'view':
      const ViewComponent = view.view as View
      const [ViewLayout, viewLayoutProps] = getLayout(params, ViewComponent.layout)
      const initialProps = params.state.props || {}
      const derivedProps = deriveProps(ViewComponent, params)
      return (
        <ViewLayout {...params} {...viewLayoutProps}>
          <Catcher params={params} view={view}>
            <Suspense
              fallback={
                <div className='Router__loading'>
                  <Spin size='large' />
                </div>
              }
            >
              <ViewComponent {...params} {...initialProps} {...derivedProps} />
            </Suspense>
          </Catcher>
        </ViewLayout>
      )
    case 'error':
      return (
        <Layout {...params}>
          <Error {...params} code={view.code} error={view.error} />
        </Layout>
      )
    case 'fallback':
      if (typeof view.fallback === 'string') {
        return (
          <Layout {...params}>
            {view.fallback}
          </Layout>
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
