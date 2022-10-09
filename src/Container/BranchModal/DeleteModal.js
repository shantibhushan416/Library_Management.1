import React from "react";
import { Button, Modal, ModalHeader, ModalFooter, Spinner } from "reactstrap";

const DeleteModal = (props) => {
  const { isOpen, toggle, onConfirmation, actionLoader } = props;
  return (
    <div className="border border-0">
      <Modal isOpen={isOpen} backdrop={false} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          Are you sure you want to delete ?
        </ModalHeader>

        <ModalFooter>
          <Button color="primary" onClick={onConfirmation}>
            {actionLoader && <Spinner className="me-2" size="sm" />}
            Delete
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteModal;
