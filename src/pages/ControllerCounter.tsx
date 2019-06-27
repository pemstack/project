import { JValue } from '@pema/utils'
import { App, Controller, RouteProps, View, view, WithController } from 'app'
import Links from 'components/Links'
import React from 'react'

class CounterController implements Controller {
  app: App
  count: number = 0

  constructor(state: JValue, app: App) {
    this.app = app
    this.count = typeof state === 'number' ? state : 0
  }

  onEnter(props: RouteProps) {
    return view(CounterView)
  }

  increment() {
    this.count++
    this.app.emit('render')
  }

  toJSON() {
    return this.count
  }
}

type CounterView = View<WithController<CounterController>>

const CounterView: CounterView = ({ controller }) => {
  return (
    <div className='Counter'>
      Count {controller.count}
      <br />
      <button onClick={() => controller.increment()}>Add</button>
      <Links />
    </div>
  )
}

export default CounterController
