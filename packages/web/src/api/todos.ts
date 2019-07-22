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
    console.log('GET_TODOS')
    return api.get().json()
  }
}

export const ADD_TODO: Action<AddTodoParams, void> = {
  invalidates: ['todos'],
  progress: true,
  perform(params: AddTodoParams) {
    console.log('ADD_TODO', params)
    return api.post(params).res()
  }
}

export const CLEAR_TODOS: Action<void, void> = {
  invalidates: ['todos'],
  progress: true,
  perform() {
    console.log('CLEAR_TODOS')
    return api.delete().res()
  }
}
