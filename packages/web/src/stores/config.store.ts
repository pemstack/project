import { App } from 'app'

export class ConfigStore {
  constructor(
    state: {},
    private readonly app: App
  ) {
    if (state) {
      Object.assign(this, state)
    }
  }

  navbarTitle: string = 'InClass'

  setNavbarTitle(title: string) {
    this.navbarTitle = title
    this.app.emit('config.navbarTitle')
  }
}
