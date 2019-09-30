import { authorize, View, view } from 'app'
import React from 'react'
import { CenterContent } from 'components'
import { InvitationList } from './InvitationList'

export const InvitationsRoute: View = () => {
  return (
    <CenterContent>
      <InvitationList />
    </CenterContent>
  )
}

export default authorize({
  action: view(InvitationsRoute)
})
