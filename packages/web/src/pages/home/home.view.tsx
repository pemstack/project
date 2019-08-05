import React from 'react'
import { View } from 'app'
import { MyProfile } from 'components'

export const HomeView: View = () => {
  return (
    <div className='Home'>
      Home page
      <MyProfile />
    </div>
  )
}
