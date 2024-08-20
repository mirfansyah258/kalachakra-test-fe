import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import noData from '../assets/img/2953962.jpg';

function Detail() {
  const { id } = useParams()
  const apiUrl = process.env.REACT_APP_API_URL;
  const [detail, setDetail] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItem()
  }, []);


  const [addMd, setAddMd] = useState(false);
  const [addBody, setAddBody] = useState({
    activity_id: id,
    item_name: '',
    priority: ''
  });
  const addMdShow = () => {
    setAddMd(true)
    setAddBody({
      activity_id: id,
      item_name: '',
      priority: ''
    })
  };
  const addMdClose = () => setAddMd(false);

  const [editMd, setEditMd] = useState(false);
  const [editBody, setEditBody] = useState({
    activity_id: '',
    item_name: '',
    priority: ''
  });
  const editMdShow = (data) => {
    setEditMd(true)
    setEditBody({
      id: data.id,
      activity_id: data.activity_id,
      item_name: data.item_name,
      priority: data.priority
    })
  };
  const editMdClose = () => setEditMd(false);

  const [deleteMd, setDeleteMd] = useState(false);
  const [delId, setDelId] = useState('');
  const deleteMdShow = (id) => {
    setDeleteMd(true)
    setDelId(id)
  };
  const deleteMdClose = () => setDeleteMd(false);

  const getItem = () => {
    axios.get(`${apiUrl}/todoitems/${id}`)
      .then(res => {
        setDetail(res.data)
        setItems(res.data.data)
        console.log(detail);
        
      })
      .catch(err => console.error(err));
  }

  const addItem = (body) => {
    axios.post(`${apiUrl}/todoitems`, body)
      .then(() => {
        getItem()
        addMdClose()
        // setTitle("Success")
        // setText("Item deleted successfully")
        // setToastShow(true)
      })
      .catch(err => console.error(err));
  };

  const editItem = (body) => {
    axios.put(`${apiUrl}/todoitems/${body.id}`, body)
      .then(() => {
        getItem()
        editMdClose()
        // setTitle("Success")
        // setText("Item deleted successfully")
        // setToastShow(true)
      })
      .catch(err => console.error(err));
  };

  const checkItem = (id) => {
    axios.put(`${apiUrl}/todoitems/check/${id}`)
      .then(() => {
        getItem()
        // setTitle("Success")
        // setText("Item deleted successfully")
        // setToastShow(true)
      })
      .catch(err => console.error(err));
  };

  const deleteItem = (id) => {
    axios.delete(`${apiUrl}/todoitems/${id}`)
      .then(() => {
        deleteMdClose()
        getItem()
        // setTitle("Success")
        // setText("Item deleted successfully")
        // setToastShow(true)
      })
      .catch(err => console.error(err));
  };

  const MyBadge = ({ priority }) => {
    let bg = ''
    let text = ''
    switch (priority) {
      case 'very-high':
        bg = 'danger'
        text = 'Very High'
        break;

      case 'high':
        bg = 'warning'
        text = 'High'
        break;

      case 'medium':
        bg = 'primary'
        text = 'Medium'
        break;

      case 'low':
        bg = 'info'
        text = 'Low'
        break;
    
      default:
        bg = 'success'
        text = 'Very Low'
        break;
    }
    return (<Badge pill bg={bg} className='mx-3'>
      {text}
    </Badge>
  )}

  return (
    <div className="container">
      <div className='row my-5'>
        <div className='col-lg-6 col-sm-12'>
          <div className='d-flex'>
            <Link to="/"><h1><FontAwesomeIcon icon={faChevronLeft} /></h1></Link>
            <h1 className='ms-3'>{detail.activity_name}</h1>
          </div>
        </div>
        <div className='col-lg-6 col-sm-12'>
          <div className='d-flex justify-content-end'>
            <Button size='lg' onClick={addMdShow}><FontAwesomeIcon icon={faPlus} /> Add</Button>
          </div>
        </div>
      </div>


      {items.length ? items.map((todo, idx) => (
        <div className="my-card mb-3 d-flex justify-content-between" key={idx}>
          <div className='d-inline-flex'>
            <Form.Check // prettier-ignore
              type="checkbox"
              onChange={() => checkItem(todo.id)}
              checked={!todo.is_active}
            />
            <div>
              <MyBadge priority={todo.priority}></MyBadge>
            </div>
            <p className={`mb-0 ${todo.is_active ? '' : 'text-decoration-line-through'}`}>{todo.item_name}</p>
          </div>
          <div className='d-inline-flex'>
            <a href='#' className='text-warning me-2' onClick={() => editMdShow(todo)}><FontAwesomeIcon icon={faPenToSquare} /></a>
            <a href='#' className='text-danger' onClick={() => deleteMdShow(todo.id)}><FontAwesomeIcon icon={faTrashCan} /></a>
          </div>
        </div>
      )) : <div className='m-auto my-img-container'><img src={noData} className='w-100' /></div>}

      <Modal show={addMd} onHide={addMdClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Add the item name" onChange={(e) => setAddBody({ ...addBody, item_name: e.target.value })} value={addBody.item_name} />
          </Form.Group>
          <Form.Group className="mb-3" onChange={(e) => setAddBody({ ...addBody, priority: e.target.value })}>
            <Form.Label>Priority</Form.Label>
            <Form.Select aria-label="Default select example" value={addBody.priority}>
              <option value="very-high">Very High</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addMdClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addItem(addBody)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editMd} onHide={editMdClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Add the item name" onChange={(e) => setEditBody({ ...editBody, item_name: e.target.value })} value={editBody.item_name} />
          </Form.Group>
          <Form.Group className="mb-3" onChange={(e) => setEditBody({ ...editBody, priority: e.target.value })}>
            <Form.Label>Priority</Form.Label>
            <Form.Select aria-label="Default select example" value={editBody.priority}>
              <option value="very-high">Very High</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editMdClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editItem(editBody)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteMd} onHide={deleteMdClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to delete this Item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteMdClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteItem(delId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default Detail