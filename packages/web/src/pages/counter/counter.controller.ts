import { Controller } from 'app'
import { action, observable } from 'mobx'

export class CounterController implements Controller {
  @observable count: number = 0

  constructor(state: number) {
    this.count = typeof state === 'number' ? state : 0
  }

  onEnter() { }

  @action increment() {
    this.count++
  }

  toJSON() {
    return this.count
  }
}
