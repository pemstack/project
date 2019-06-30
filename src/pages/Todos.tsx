import { Controller, View, view, WithController } from 'app'
import Links from 'components/Links'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import wretch from 'wretch'

const api = wretch('/api/todos')

interface Todo {
  title: string
  done: boolean
}

class TodosController implements Controller {
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
    return view(Todos)
  }
}

type TodosType = View<WithController<TodosController>>

const Todos: TodosType = observer(({ controller }) => {
  const { todos } = controller
  const [title, setTitle] = useState('')
  return (
    <div className='Home'>
      <Links />
      <h3>Todos</h3>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo.title} {todo.done ? '✓' : 'X'}</li>)}
      </ul>
      <div>
        <button onClick={() => controller.addTodo(title)}>Add</button>
        <button onClick={() => controller.clearTodos()}>Clear</button>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
    </div>
  )
})

export default TodosController
