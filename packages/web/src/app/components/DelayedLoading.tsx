import React, { FunctionComponent } from 'react'
import { Loading } from './Loading'
import { Delay } from 'components'

export const DelayedLoading: FunctionComponent = () => {
  return (
    <Delay ms={50}>
      <Loading />
    </Delay>
  )
}
