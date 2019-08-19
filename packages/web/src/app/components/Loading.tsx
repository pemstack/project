import React, { FunctionComponent } from 'react'
import { Spin } from 'antd'
import './Loading.css'

export const Loading: FunctionComponent = () => {
  return (
    <div className='Loading'>
      <Spin size='large' />
    </div>
  )
}
