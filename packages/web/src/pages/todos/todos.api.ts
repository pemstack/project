import { Action, Query } from '@pema/state'
import wretch from 'wretch'
import * as yup from 'yup'

const api = wretch('/api/todos')

export interface TodoResult {
  title: string
  done: boolean
}

export const GET_TODOS: Query<TodoResult[]> = {
  resource: 'todos',
  cache: true,
  async fetch() {
    return api.get().json()
  }
}

const addTodoSchema = yup.object({
  title: yup.string().required(),
  done: yup.boolean().notRequired()
})

type AddTodoParams = yup.InferType<typeof addTodoSchema>

export const ADD_TODO: Action<AddTodoParams, void> = {
  schema: addTodoSchema,
  perform(params: AddTodoParams) {
    return api.post(params).res()
  },
  invalidates: ['todos']
}

export const CLEAR_TODOS: Action<void, void> = {
  async perform() {
    return api.delete().res()
  },
  invalidates: ['todos']
}
