import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faPenToSquare, faL } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Container/Axios/Axios";
import AddModal from "../../Container/BranchModal/AddModal";
import DeleteModal from "../../Container/BranchModal/DeleteModal";
import EditModal from "../../Container/BranchModal/EditModal";
import "./Gener.css";

const Gener = (props) => {
  const [branchList, setBranchList] = useState([]);
  const [branch_name, setBranch_Name] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [toEditBranchName, setToEditBranchName] = useState("");
  const [actionLoader, setActionLoader] = useState(false);

  const getApiData = async () => {
    try {
      const res = await axios.get("/api/branch?page=1&pageSize=10");
      setBranchList(res.data.data.docs);
      // setBranch_Name(res.data.data.docs[0].branch_name);
      // setBranchId(res.data.data.docs[0]._id);
    } catch (err) {
      console.log(console.log(err.message));
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
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
        getApiData();
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
        getApiData();
        toggleDeleteModal();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
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
        getApiData();
        toggleEditModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoader(false);
    }
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
        <CardHeader>All</CardHeader>
        <ListGroup flush>
          {branchList.map((item, index) => {
            return (
              <ListGroupItem
                key={index}
                id={index}
                className="d-flex flex-row justify-content-between"
              >
                {item.branch_name}

                <div>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => handleEditBranch(item._id, item.branch_name)}
                    className="me-1"
                  />
                  <FontAwesomeIcon
                    onClick={() => handleDeleteBranch(item._id)}
                    icon="trash"
                  />
                </div>
              </ListGroupItem>
            );
          })}

          <ListGroupItem className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faPlus} onClick={toggleAddModal} />
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
};

export default Gener;
