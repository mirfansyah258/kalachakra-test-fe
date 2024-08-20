import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

function TodoToast({ toastShow, setToastShow, title = "Success", text }) {
  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{ text }</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default TodoToast