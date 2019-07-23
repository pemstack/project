import { Controller } from 'app'
import { observable } from 'mobx'
import wretch from 'wretch'

const api = wretch('/api/todos')

export interface Todo {
  title: string
  done: boolean
}

export class TodosMobxController implements Controller {
  @observable todos: Todo[] = []

  async getTodos() {
    const todos = await api.get().json()
    this.todos = (todos || []) as Todo[]
  }

  async addTodo(title: string) {
    if (title) {
      await api.post({ title })
      this.todos.push({ title, done: false })
    }
  }

  async clearTodos() {
    await api.delete()
    this.todos = []
  }

  async onEnter() {
    await this.getTodos()
  }
}
