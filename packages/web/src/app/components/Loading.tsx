import { Skeleton } from 'antd'
import React, { FunctionComponent } from 'react'
import './Loading.css'

const Loading: FunctionComponent = () => {
  return (
    <div className='Loading'>
      <Skeleton active />
    </div>
  )
}

export default Loading
