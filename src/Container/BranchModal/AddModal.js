import React, { useEffect, useState } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
} from "reactstrap";

function AddModal(props) {
  const { isOpen, toggle, onSubmit, actionLoader } = props;
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setBranchName("");
    }
  }, [isOpen]);

  const handleAddBranch = () => {
    if (!branchName.trim()) return;
    onSubmit(branchName);
  };

  return (
    <div>
      <Modal isOpen={isOpen} backdrop={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Branch</ModalHeader>
        <ModalBody>
          <Input
            value={branchName}
            type="text"
            name="branchName"
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Branch Name"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddBranch}>
            {actionLoader && <Spinner className="me-2" size="sm" />}
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

export default AddModal;
