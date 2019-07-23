import { Action, Query } from '@pema/state'
import wretch from 'wretch'

const api = wretch('/api/todos')

export interface TodoResult {
  title: string
  done: boolean
}

export interface AddTodoParams {
  title: string
  done?: boolean
}

export const GET_TODOS: Query<TodoResult[]> = {
  resource: 'todos',
  progress: true,
  async fetch() {
    return api.get().json()
  }
}

export const ADD_TODO: Action<AddTodoParams, void> = {
  progress: true,
  perform(params: AddTodoParams) {
    return api.post(params).res()
  },
  optimistic: {
    todos: ({ value, params }) => {
      const todos = value as TodoResult[]
      const { title, done = false } = params
      return [...todos, { title, done }]
    }
  }
}

export const CLEAR_TODOS: Action<void, void> = {
  progress: true,
  async perform() {
    return api.delete().res()
  },
  optimistic: {
    todos: () => ([])
  }
}
