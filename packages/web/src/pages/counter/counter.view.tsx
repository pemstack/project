import { View, WithController } from 'app'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CounterController } from './counter.controller'

type CounterView = View<WithController<CounterController>>

export const CounterView: CounterView = observer(({ controller }) => {
  return (
    <div className='Counter'>
      Count {controller.count}
      <br />
      <button onClick={() => controller.increment()}>Add</button>
    </div>
  )
})
