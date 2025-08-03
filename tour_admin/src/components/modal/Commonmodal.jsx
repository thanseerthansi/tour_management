import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Row } from 'react-bootstrap';

export default function Commonmodal({show,handleClose,size,title,children}) {
  return (
    <div>
     <Modal show={show} size={size} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal>
</div>
  )
}
