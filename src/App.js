import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import { Button, Modal } from 'react-bootstrap';
import TodoToast from './components/TodoToast';

function App() {
  const [todos, setTodos] = useState([]);
  // modals
  const [editMd, setEditMd] = useState(false);
  const [deleteMd, setDeleteMd] = useState(false);
  // toast
  const [title, setTitle] = useState('Success');
  const [text, setText] = useState('');
  const [toastShow, setToastShow] = useState(false);

  const [edit, setEdit] = useState({
    id: '',
    activity_name: ''
  });
  const [delId, setDelId] = useState('');

  const editMdShow = (data) => setEditMd(true);
  const editMdClose = () => setEditMd(false);
  
  const deleteMdShow = (id) => {
    setDeleteMd(true)
    setDelId(id)
  };
  const deleteMdClose = () => setDeleteMd(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getTodo()
  }, []);

  const getTodo = () => {
    axios.get(`${apiUrl}/todolist`)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }

  const addTodo = (activity_name) => {
    axios.post(`${apiUrl}/todolist`, { activity_name })
      .then(res => {
        getTodo()
        setTitle("Success")
        setText("Activity added successfully")
        setToastShow(true)
      })
      .catch(err => {
        console.error(err)
        setTitle("Error")
        setText(err.response.data.error)
        setToastShow(true)
      });
  };

  const updateTodo = (id, activity_name) => {
    axios.put(`${apiUrl}/todolist/${id}`, { activity_name })
      .then(res => {
        editMdClose()
        getTodo()
        setTitle("Success")
        setText("Activity changed successfully")
        setToastShow(true)
      })
      .catch(err => console.error(err));
  };


  const deleteTodo = (id) => {
    axios.delete(`${apiUrl}/todolist/${id}`)
      .then(() => {
        deleteMdClose()
        getTodo()
        setTitle("Success")
        setText("Activity deleted successfully")
        setToastShow(true)
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <header className="App-header py-3">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          To Do List App.
        </h2>
      </header>
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

      <Modal show={editMd} onHide={editMdClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editMdClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateTodo()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteMd} onHide={deleteMdClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete To Do?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to delete this To Do?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteMdClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteTodo(delId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <TodoToast title={title} toastShow={toastShow} setToastShow={setToastShow} text={text} />
    </div>
  );
}

export default App;
