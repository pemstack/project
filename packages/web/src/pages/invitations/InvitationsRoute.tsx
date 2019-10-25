import { authorize, View, view } from 'app'
import { CenterContent } from 'components'
import React from 'react'
import { InvitationList } from './InvitationList'
import './InvitationsRoute.css'

export const InvitationsRoute: View = () => {
  return (
    <CenterContent className='InvitationsRoute'>
      <InvitationList />
    </CenterContent>
  )
}

export default authorize({
  action: view(InvitationsRoute)
})
