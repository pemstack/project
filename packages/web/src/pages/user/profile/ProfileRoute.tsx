import React from 'react'
import { View, useQuery } from 'app'
import { GET_CURRENT_USER } from 'api/user.api'
import { ProfileView } from './ProfileView'

export const ProfileRoute: View = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)
  return (
    <div className='ProfileRoute'>
      <ProfileView item={data} loading={loading} />
    </div>
  )
}
