import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

function Popup(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <FontAwesomeIcon onClick={toggle} icon={faPlus} />

      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Branch Name</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={props.branch}
            name="branchName"
            onChange={props.changed}
            placeholder="Branch Name"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.clicked}>
            Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Popup;
