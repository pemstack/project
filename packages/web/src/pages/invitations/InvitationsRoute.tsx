import { authorize, View, view } from 'app'
import { CenterContent } from 'components'
import React from 'react'
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
