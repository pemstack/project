import { Controller } from 'app'
import { observable } from 'mobx'

export class CounterController implements Controller {
  @observable count: number = 0

  constructor(state: number) {
    this.count = typeof state === 'number' ? state : 0
  }

  onEnter() { }

  increment() {
    this.count++
  }

  toJSON() {
    return this.count
  }
}
