import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'

const TodoForm = ({ addTodo }) => {
  const [activity_name, setActivity_name] = useState('');

  const handleSubmit = e => {
    e.preventDefault()

    addTodo(activity_name)

    setActivity_name('')
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control mr-3"
        value={activity_name}
        onChange={(e) => setActivity_name(e.target.value)}
        placeholder="Add Activity Name"
      />
      <button className="btn btn-primary" onClick={handleSubmit}><FontAwesomeIcon icon={faPlus} /> Add</button>
    </div>
  )
}

export default TodoForm