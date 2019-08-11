import React from 'react'
import { View, useQuery } from 'app'
import { Button } from 'antd'
import { ME } from 'api/user.api'
import { Profile } from './Profile'

export const ProfileView: View = ({ }) => {
  const { data, loading, error } = useQuery(ME)
  return (
    <div className='ProfileView'>
      <Profile item={data} loading={loading} />
    </div>
  )
}
