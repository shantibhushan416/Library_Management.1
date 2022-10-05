import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const EditModal = (props) => {
  const { modal, toggle, branchname, changed, branchId, edit } = props;
  return (
    <div className="border border-0">
      <Modal isOpen={modal} backdrop={false} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Edit Branch</ModalHeader>
        <ModalBody>
          <Input value={branchname} onChange={changed} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => edit(branchId)}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Undo
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditModal;
