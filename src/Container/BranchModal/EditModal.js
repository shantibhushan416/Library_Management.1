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

const EditModal = (props) => {
  const { toggle, initialBranchName, isOpen, onSubmit, actionLoader } = props;
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setBranchName(initialBranchName);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!branchName.trim()) return;
    onSubmit(branchName);
  };

  return (
    <div className="border border-0">
      <Modal isOpen={isOpen} backdrop={false} keyboard={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Branch</ModalHeader>
        <ModalBody>
          <Input
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            {actionLoader && <Spinner className="me-2" size="sm" />}
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
