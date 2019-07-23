import React, { useState } from 'react'
import { useAction, useQuery, View } from 'app'
import { Button } from 'antd'
import { ADD_TODO, CLEAR_TODOS, GET_TODOS } from './todos.api'

export const TodosView: View = () => {
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
    <div className='Todos'>
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
