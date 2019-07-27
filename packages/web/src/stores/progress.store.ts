import { App } from 'app'
import nprogress from 'nprogress'
import debounce from 'lodash/debounce'

nprogress.configure({
  showSpinner: false,
  trickleSpeed: 50
})

const DELAY = 50

export class ProgressStore {
  private app: App
  private count: number

  private onEnter = () => {
    this.start()
  }

  private afterEnter = () => {
    this.done()
  }

  private handler = debounce(() => {
    if (this.count === 0) {
      nprogress.done()
    } else {
      nprogress.start()
    }
  }, DELAY, { leading: false, trailing: true })

  constructor(_: any, app: App) {
    this.app = app
    this.count = 0
    app.events.on('router.onEnter', this.onEnter)
    app.events.on('router.afterEnter', this.afterEnter)
    app.events.on('router.onRedirect', this.afterEnter)
  }

  async track<T>(delayed: Promise<T> | (() => Promise<T>)): Promise<T> {
    this.start()
    try {
      if (typeof delayed === 'function') {
        return await delayed()
      } else {
        return await delayed
      }
    } finally {
      this.done()
    }
  }

  start() {
    this.count++
    this.handler()
  }

  done() {
    this.count = Math.max(this.count - 1, 0)
    this.handler()
  }

  dispose() {
    this.app.events.off('router.onEnter', this.onEnter)
    this.app.events.off('router.afterEnter', this.afterEnter)
    this.app.events.off('router.onRedirect', this.afterEnter)
    this.handler.cancel()
  }
}
