import { memoizeLazy } from '@pema/utils'

export class RecaptchaStore {
  private count: number = 0
  private disposed: boolean = false

  private load = memoizeLazy(() => import('./loader')
    .then(module => module.default())
    .then(grecaptcha => {
      this.syncVisibility()
      return grecaptcha
    }))

  show() {
    this.count++
    this.load()
    this.syncVisibility()
  }

  hide() {
    this.count--
    this.syncVisibility()
  }

  async token(action: string): Promise<string> {
    const grecaptcha = await this.load()
    return await grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_KEY, { action })
  }

  syncVisibility() {
    if (this.disposed || typeof document === 'undefined') {
      return
    }

    const element = document.getElementsByClassName('grecaptcha-badge')[0] as HTMLElement
    if (element) {
      element.style.visibility = this.count === 0 ? 'hidden' : 'visible'
    }
  }

  dispose() {
    this.count = 0
    this.syncVisibility()
    this.disposed = true
  }
}
