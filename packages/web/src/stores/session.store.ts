import { Dictionary, JValue } from '@pema/utils'

interface Storage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

class ObjectStorage implements Storage {
  private state: Dictionary

  constructor() {
    this.state = {}
  }

  getItem(key: string) {
    return this.state[key]
  }

  setItem(key: string, value: string) {
    this.state[key] = value
  }

  removeItem(key: string) {
    delete this.state[key]
  }

  clear() {
    this.state = {}
  }
}

export class SessionStore {
  private readonly storage: Storage

  constructor() {
    this.storage = window.sessionStorage || new ObjectStorage()
  }

  get(key: string): JValue {
    const str = this.storage.getItem(key)
    return str ? JSON.parse(str) : null
  }

  set(key: string, value: JValue) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
