import { memoizeLazy } from '@pema/utils'

const load = memoizeLazy(() => import('./loader').then(m => m.default()))

export class RecaptchaStore {
  show() {
    // todo
    load()
  }

  async token(action: string): Promise<string> {
    const grecaptcha = await load()
    return await grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_KEY, { action })
  }
}
