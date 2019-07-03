import { View, WithController } from 'app'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CounterController } from './CounterController'

type CounterView = View<WithController<CounterController>>

const CounterView: CounterView = ({ controller }) => {
  return (
    <div className='Counter'>
      Count {controller.count}
      <br />
      <button onClick={() => controller.increment()}>Add</button>
    </div>
  )
}

export default observer(CounterView)
