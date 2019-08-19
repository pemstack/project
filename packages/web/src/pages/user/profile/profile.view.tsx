import React from 'react'
import { View, useQuery } from 'app'
import { GET_CURRENT_USER } from 'api/user.api'
import { Profile } from './Profile'

export const ProfileView: View = ({ }) => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)
  return (
    <div className='ProfileView'>
      <Profile item={data} loading={loading} />
    </div>
  )
}
