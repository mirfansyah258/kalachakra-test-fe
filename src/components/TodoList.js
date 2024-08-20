import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete }) => {
  return (
    <div className='row mt-3'>
      {todos.map((todo, idx) => (
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12'>
          <TodoItem
            key={idx}
            detail={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
