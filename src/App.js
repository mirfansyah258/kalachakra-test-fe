import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import { Button, Modal } from 'react-bootstrap';
import TodoToast from './components/TodoToast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home';
import Detail from './views/Detail';

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
    <Router>
      <div className="App">
        <header className="App-header py-3">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            To Do List App.
          </h2>
        </header>
        <Routes>
          <Route path='/' element={<Home addTodo={addTodo} todos={todos} editMdShow={editMdShow} deleteMdShow={deleteMdShow} />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>

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
    </Router>
  );
}

export default App;
