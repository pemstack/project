import { Empty } from 'antd'
import { View } from 'app'
import { CenterContent, CollapseCard } from 'components'
import React from 'react'
import { LandingPage } from './LandingPage'

export const HomeRoute: View = ({
  app
}) => {
  // const [accessToken, setAccessToken] = useState<string | null>(null)
  // useEffect(() => {
  //   let cancel = false
  //   async function fetch() {
  //     let token: string | null
  //     try {
  //       token = await app.user.getAccessToken(true)
  //     } catch {
  //       token = null
  //     }

  //     if (cancel) {
  //       return
  //     }

  //     setAccessToken(token)
  //   }

  //   fetch()
  //   return () => { cancel = true }
  // }, [app.user])

  if (!app.user.authenticated) {
    return (
      <div className='HomeRoute'>
        <LandingPage />
      </div>
    )
  }

//   const source = `
// ## Access token

// \`\`\`
// ${accessToken || '<no token>'}
// \`\`\`
//   `

  return (
    <div className='HomeRoute'>
      <CenterContent>
        <CollapseCard>
          <Empty />
          {/* <Markdown source={source} />
          {accessToken && (
            <Button
              icon='copy'
              type='primary'
              onClick={() => navigator.clipboard.writeText(accessToken)}
            >
              Copy
            </Button>
          )} */}
        </CollapseCard>
      </CenterContent>
    </div>
  )
}

HomeRoute.layout = ({ app }) => app.user.authenticated ? 'user' : 'none'
