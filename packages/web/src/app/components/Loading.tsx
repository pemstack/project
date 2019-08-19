import React from 'react'
import { View } from 'app'
import { Spin } from 'antd'
import './Loading.css'

export const Loading: View = () => {
  return (
    <div className='Loading'>
      <Spin size='large' />
    </div>
  )
}
