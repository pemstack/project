import { Dictionary } from '@pema/utils'

export class MemoryStore {
  private readonly data: Dictionary

  constructor() {
    this.data = {}
  }

  get(name: string) {
    return this.data[name]
  }

  remove(name: string) {
    delete this.data[name]
  }
}
