import React, { useState } from 'react'
import { View, WithController } from 'app'
import { observer } from 'mobx-react-lite'
import { TodosMobxController } from './todos-mobx.controller'
import { Button } from 'antd'

export type TodosMobxViewType = View<WithController<TodosMobxController>>

const TodosMobxView: TodosMobxViewType = ({ controller }) => {
  const { todos } = controller
  const [title, setTitle] = useState('')
  return (
    <div className='Todos'>
      <h3>Todos</h3>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo.title} {todo.done ? '✓' : 'X'}</li>)}
      </ul>
      <div>
        <Button style={{ margin: 4 }} type='primary' onClick={() => controller.addTodo(title)}>Add</Button>
        <Button style={{ margin: 4 }} type='danger' onClick={() => controller.clearTodos()}>Clear</Button>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
    </div>
  )
}

export default observer(TodosMobxView)
