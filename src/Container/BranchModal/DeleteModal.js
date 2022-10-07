import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeleteModal = (props) => {
  const { modal, toggle, id, Delete, deleteItem } = props;
  return (
    <div className="border border-0">
      <Modal isOpen={modal} backdrop={false} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Delete Branch</ModalHeader>
        <ModalBody>Are you sure you want to delete "{deleteItem}"?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => Delete(id)}>
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
