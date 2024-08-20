import React from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

function Home({ addTodo, todos, editMdShow, deleteMdShow }) {
  return (
    <div className="container">
      <div className='row'>
        <div className='col-lg-6 col-md-4'>
          <h1 className="my-3">Activity</h1>
        </div>
        <div className='col-lg-6 col-md-8 align-content-end'>
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
      <TodoList
        todos={todos}
        onEdit={editMdShow}
        onDelete={deleteMdShow}
      />
    </div>
  )
}

export default Home