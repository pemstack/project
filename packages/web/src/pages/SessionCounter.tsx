import { View, WithSession } from 'app'
import Links from 'components/Links'
import React from 'react'

interface CounterSession {
  count: number
}

type SessionCounter = View<WithSession<CounterSession>>

const SessionCounter: SessionCounter = ({ app, session }) => {
  return (
    <div className='Counter'>
      <Links />
      Count {session.count}
      <br />
      <button
        onClick={() => {
          session.count++
          app.emit('render')
        }}>
        Add
      </button>
    </div>
  )
}

SessionCounter.onEnter = ({ session }) => {
  if (!session.initialized) {
    session.count = 0
    session.initialized = true
  }
}

export default SessionCounter
