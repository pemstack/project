import { View, WithState } from 'app'
import Links from 'components/Links'
import React from 'react'

interface CounterState {
  count: number
}

type StateCounter = View<WithState<CounterState>>

const StateCounter: StateCounter = ({ app, state }) => {
  return (
    <div className='Counter'>
      <Links />
      Count {state.count}
      <br />
      <button
        onClick={() => {
          state.count++
          app.emit('render')
        }}>
        Add
      </button>
    </div>
  )
}

StateCounter.onEnter = ({ state }) => {
  if (!state.initialized) {
    state.count = 0
    state.initialized = true
  }
}

export default StateCounter
