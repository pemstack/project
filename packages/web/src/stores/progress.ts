import { App } from 'app'
import nprogress from 'nprogress'
import debounce from 'lodash.throttle'

nprogress.configure({
  showSpinner: false,
  trickleSpeed: 50
})

const DELAY = 10

export class ProgressStore {
  private app: App
  private count: number

  private onEnter = () => {
    console.log('Start')
    this.start()
  }

  private afterEnter = () => {
    console.log('Done')
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
    this.count = 0;
    (this as any).np = nprogress
    app.events.on('router.onEnter', this.onEnter)
    app.events.on('router.afterEnter', this.afterEnter)
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
    this.handler.cancel()
  }
}
