import React, { useState } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

function Popup(props) {
  return (
    <div>
      <Modal
        isOpen={props.modal}
        backdrop={false}
        toggle={props.toggle}
        {...props}
      >
        <ModalHeader toggle={props.toggle}>Add Branch</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            name="branchName"
            onChange={props.changed}
            placeholder="Branch Name"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.addBranch}>
            Add
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Popup;
