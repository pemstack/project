import React from 'react'
import { View } from 'app'
import { Skeleton } from 'antd'
import './Loading.css'

export const Loading: View = () => {
  return (
    <div className='Loading'>
      <Skeleton active />
    </div>
  )
}
