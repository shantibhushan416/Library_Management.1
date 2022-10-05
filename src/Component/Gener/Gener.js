import React, { useEffect, useState } from "react";

import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Container/Axios/Axios";
import Popup from "../../Container/BranchModal/AddModal";
import DeleteModal from "../../Container/BranchModal/DeleteModal";
import EditModal from "../../Container/BranchModal/EditModal";
import "./Gener.css";

const Gener = (props) => {
  const [branchList, setBranchList] = useState([]);
  const [branch_name, setBranch_Name] = useState("");
  const [branchpopup, setBranchPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editpopup, setEditPopup] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [deletebranch, setDeleteBranch] = useState("");

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
  const popup = () => {
    setBranchPopup(!branchpopup);
  };

  const onSubmitHAndler = () => {
    if (branch_name.trim === "") return;

    let branchName = { branch_name };
    axios
      .post("/api/branch/", branchName)
      .then((res) => {
        getApiData();
        popup();
      })
      .catch((err) => {
        console.log(err);
      });
    setBranch_Name("");
  };
  /*------------*/

  const DeleteConfirmation = (item) => {
    setDeletePopup(!deletePopup);
    setDeleteBranch(item);
  };
  const Delete = async (id) => {
    try {
      await axios.delete(`/api/branch/${id}`);
      getApiData();
      DeleteConfirmation();
    } catch (error) {
      console.log(error);
    }
  };
  /*------------*/

  const editPopup = () => {
    setEditPopup(!editpopup);
  };
  const selectBranch = (id) => {
    editPopup();
    setBranch_Name(branchList[id].branch_name);
    setBranchId(branchList[id]._id);
  };

  const updateBranch = async () => {
    let branchName = { branch_name };
    try {
      await axios.put(`/api/branch/${branchId}`, branchName);
      setBranchList((olditem) => {
        return [olditem, branch_name];
      });
      getApiData();
      editPopup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                  onClick={() => selectBranch(index)}
                  className="me-1"
                />
                <FontAwesomeIcon
                  onClick={() => DeleteConfirmation(item.branch_name)}
                  icon="trash"
                />
                <EditModal
                  modal={editpopup}
                  toggle={editPopup}
                  changed={(e) => setBranch_Name(e.target.value)}
                  branchname={branch_name}
                  key={index}
                  branchId={branchId}
                  edit={updateBranch}
                />
                <DeleteModal
                  modal={deletePopup}
                  toggle={DeleteConfirmation}
                  id={item._id}
                  Delete={Delete}
                  deleteItem={deletebranch}
                />
              </div>
            </ListGroupItem>
          );
        })}

        <ListGroupItem className="d-flex justify-content-center">
          <FontAwesomeIcon icon={faPlus} onClick={popup} />
          <Popup
            changed={(event) => setBranch_Name(event.target.value)}
            addBranch={onSubmitHAndler}
            modal={branchpopup}
            toggle={popup}
          />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default Gener;
