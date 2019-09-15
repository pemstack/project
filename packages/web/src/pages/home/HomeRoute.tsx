import React, { useState } from 'react'
import { View } from 'app'
import { useEffect } from 'react'
import { Markdown, CenterContent, CollapseCard } from 'components'
import { Button } from 'antd'

export const HomeRoute: View = ({
  app
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  useEffect(() => {
    let cancel = false
    async function fetch() {
      const token = await app.user.getAccessToken(true)
      if (cancel) {
        return
      }

      setAccessToken(token)
    }

    fetch()
    return () => { cancel = true }
  }, [app.user])

  const source = `
## Access token

\`\`\`
${accessToken || '<no token>'}
\`\`\`
  `

  return (
    <div className='HomeRoute'>
      <CenterContent>
        <CollapseCard>
          <Markdown source={source} />
          {accessToken && <Button
            icon='copy'
            type='primary'
            onClick={() => navigator.clipboard.writeText(accessToken)}
          >
            Copy
          </Button>}
        </CollapseCard>
      </CenterContent>
    </div>
  )
}
