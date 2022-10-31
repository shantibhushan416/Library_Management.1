import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "reactstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Container/Axios/Axios";
import AddModal from "../../Container/BranchModal/AddModal";
import DeleteModal from "../../Container/BranchModal/DeleteModal";
import EditModal from "../../Container/BranchModal/EditModal";
import "./BranchList.css";
import { getLocalStorageData } from "../../utils/utility";

const Gener = (props) => {
  const [branchList, setBranchList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [toEditBranchName, setToEditBranchName] = useState("");
  const [actionLoader, setActionLoader] = useState(false);

  useEffect(() => {
    getBrancList();
  }, []);

  const isLogedIn = !!getLocalStorageData();
  const getBrancList = async () => {
    try {
      const { data } = await axios.get("/api/branch");
      console.log(data.data);
      setBranchList(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  /*------------*/
  const toggleAddModal = () => {
    setAddModalOpen((prev) => !prev);
  };

  const onSubmitHandler = async (branchName) => {
    try {
      setActionLoader(true);
      const { data } = await axios.post("/api/branch/", {
        branch_name: branchName,
      });
      if (data.statusCode === 200) {
        getBrancList();
        toggleAddModal();
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoader(false);
    }
  };
  /*------------*/

  const handleDeleteBranch = (branchId) => {
    setBranchId(branchId);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  const onDeleteConfirmation = async () => {
    try {
      setActionLoader(true);
      const { data } = await axios.delete(`/api/branch/${branchId}`);
      if (data.statusCode === 200) {
        getBrancList();
        toggleDeleteModal();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ response: { data } }) {
      toast.error(data.message);
    } finally {
      setActionLoader(false);
    }
  };
  /*------------*/

  const toggleEditModal = () => {
    setEditModalOpen((prev) => !prev);
  };
  const handleEditBranch = (branchId, branchName) => {
    setToEditBranchName(branchName);
    setBranchId(branchId);
    toggleEditModal();
  };

  const updateBranch = async (branchName) => {
    try {
      setActionLoader(true);
      const { data } = await axios.put(`/api/branch/${branchId}`, {
        branch_name: branchName,
      });
      if (data.statusCode === 200) {
        getBrancList();
        toggleEditModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoader(false);
    }
  };

  const onClickBranch = (id) => {
    console.log("branch", id);
  };

  return (
    <>
      <AddModal
        actionLoader={actionLoader}
        onSubmit={onSubmitHandler}
        isOpen={addModalOpen}
        toggle={toggleAddModal}
      />
      <EditModal
        actionLoader={actionLoader}
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        onSubmit={updateBranch}
        initialBranchName={toEditBranchName}
      />
      <DeleteModal
        actionLoader={actionLoader}
        isOpen={deleteModalOpen}
        toggle={toggleDeleteModal}
        onConfirmation={onDeleteConfirmation}
      />
      <Card style={{ width: "80%" }}>
        <ListGroup variant="flush">
          <ListGroup.Item action>All</ListGroup.Item>
          {branchList.map((item, index) => {
            return (
              <ListGroup.Item
                key={index}
                id={index}
                onClick={() => onClickBranch(item._id)}
                action
                className="  border-bottom d-flex flex-row justify-content-between p-2"
              >
                {item.branch_name}

                {isLogedIn ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() =>
                        handleEditBranch(item._id, item.branch_name)
                      }
                      className="me-1"
                    />
                    <FontAwesomeIcon
                      onClick={() => handleDeleteBranch(item._id)}
                      icon="trash"
                    />
                  </div>
                ) : null}
              </ListGroup.Item>
            );
          })}

          {isLogedIn ? (
            <li className="d-flex  justify-content-center  p-2">
              <FontAwesomeIcon icon={faPlus} onClick={toggleAddModal} />
            </li>
          ) : null}
        </ListGroup>
      </Card>
    </>
  );
};

export default Gener;
