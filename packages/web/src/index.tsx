import { AppRoot, init } from 'app'
import React from 'react'
import ReactDOM from 'react-dom'

let CurrentComponent = AppRoot
let currentInit = init
let currentApp = currentInit((window as any || {}).__STATE__, reload)

async function render() {
  (window as any).app = currentApp
  currentApp.user.initialize()
  currentApp.router.reload(true)
  ReactDOM.render(<CurrentComponent app={currentApp} />, document.getElementById('root'))
}

render()

let lastReload = Date.now()
const RELOAD_MIN_MS = 1000
function reload(): void {
  const now = Date.now()
  if (lastReload + RELOAD_MIN_MS > now) {
    throw new Error('Possible reload loop detected')
  }

  lastReload = now
  currentApp.dispose()
  currentApp = currentInit({}, reload)
  render()
}

if ((module as any).hot) {
  (module as any).hot.accept('./app', function () {
    const { AppRoot: NewAppRoot, init: newInit } = require('./app')
    CurrentComponent = NewAppRoot
    currentInit = newInit
    const state = currentApp.toJSON()
    currentApp.dispose()
    currentApp = currentInit(state, reload)
    render()
  })
}
