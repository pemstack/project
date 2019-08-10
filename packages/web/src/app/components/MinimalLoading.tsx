import React from 'react'
import { View } from 'app'
import { Spin } from 'antd'
import './MinimalLoading.css'

export const MinimalLoading: View = () => {
  return (
    <div className='MinimalLoading'>
      <Spin size='large' />
    </div>
  )
}

MinimalLoading.layout = {
  type: 'minimal'
}
