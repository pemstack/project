import { View } from 'app'
import React from 'react'
import './about.view.css'
import { MyProfile } from 'components'

export const AboutView: View = () => {
  return (
    <div className='About'>
      About
      <MyProfile />
    </div>
  )
}
