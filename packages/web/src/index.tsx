import { AppRoot, init } from 'app'
import React from 'react'
import ReactDOM from 'react-dom'

let app = init((window as any || {}).__STATE__);
(window as any).app = app

async function render(Component: any) {
  app.user.initialize()
  app.router.reload(true)
  ReactDOM.render(<Component app={app} />, document.getElementById('root'))
}

render(AppRoot)

if ((module as any).hot) {
  (module as any).hot.accept('./app', function () {
    const { AppRoot: NewAppRoot, init: newInit } = require('./app')
    const newApp = newInit(app.toJSON())
    app.dispose()
    app = newApp;
    (window as any).app = app
    render(NewAppRoot)
  })
}
