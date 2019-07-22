import React, { useState } from 'react'
import { useAction, useQuery, View } from 'app'
import { ADD_TODO, CLEAR_TODOS, GET_TODOS } from 'api/todos'
import { Button } from 'antd'

export interface TodosApiViewProps { }

export type TodosApiViewType = View<TodosApiViewProps>

const TodosApiView: TodosApiViewType = ({ }) => {
  const { data, loading, error } = useQuery(GET_TODOS)
  const addTodo = useAction(ADD_TODO)
  const clearTodos = useAction(CLEAR_TODOS)

  const [title, setTitle] = useState('')

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }

  const todos = data
  return (
    <div className='TodosApi'>
      <h3>Todos</h3>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo.title} {todo.done ? '✓' : 'X'}</li>)}
      </ul>
      <div>
        <Button style={{ margin: 4 }} type='primary' onClick={() => addTodo({ title })}>Add</Button>
        <Button style={{ margin: 4 }} type='danger' onClick={() => clearTodos()}>Clear</Button>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
      </div>
    </div>
  )
}

export default TodosApiView
