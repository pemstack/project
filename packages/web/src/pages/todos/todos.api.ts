import { Action, Query } from 'app'
import * as yup from 'yup'

export interface Todo {
  title: string
  done: boolean
}

export const GET_TODOS: Query<Todo[]> = {
  resource: 'todos',
  cache: true,
  async fetch(app) {
    return app
      .req('/api/todos')
      .get()
      .json()
  }
}

const addTodoSchema = yup.object({
  title: yup.string().required(),
  done: yup.boolean().notRequired()
})

type AddTodoParams = yup.InferType<typeof addTodoSchema>

export const ADD_TODO: Action<AddTodoParams, void> = {
  schema: addTodoSchema,
  perform(params: AddTodoParams, app) {
    return app
      .req('/api/todos')
      .post(params)
      .res()
  },
  invalidates: ['todos']
}

export const CLEAR_TODOS: Action<void, void> = {
  async perform(_, app) {
    return app
      .req('/api/todos')
      .delete()
      .res()
  },
  invalidates: ['todos']
}
