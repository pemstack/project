import React from 'react'
import { View, useQuery } from 'app'
import { GET_CURRENT_USER } from 'api/user.api'
import { Profile } from './Profile'

export const ProfileRoute: View = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)
  return (
    <div className='ProfileRoute'>
      <Profile item={data} loading={loading} />
    </div>
  )
}
