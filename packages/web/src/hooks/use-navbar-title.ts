import { useApp } from '@pema/app-react'
import { App } from 'app'
import { useEffect } from 'react'

export function useNavbarTitle(title: string) {
  const app = useApp<App>()
  useEffect(() => {
    const memo = app.config.navbarTitle
    app.config.setNavbarTitle(title)
    return () => app.config.setNavbarTitle(memo)
  }, [app, title])
}
