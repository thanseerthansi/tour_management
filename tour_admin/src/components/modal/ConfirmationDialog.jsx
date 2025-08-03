import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <Modal show={open} onHide={() => onOpenChange(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onCancel();
            onOpenChange(false);
          }}
          style={{ width: '100px' }}
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
          style={{ width: '100px' }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
