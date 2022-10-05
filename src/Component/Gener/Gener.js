import React, { useEffect, useState } from "react";

import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BranchList from "../../Container/BranchList/BranchList";
import Popup from "../../Container/Modal/Modal";
import axios from "../../Container/Axios/Axios";
import "./Gener.css";

const Gener = (props) => {
  const [branchList, setBranchList] = useState([]);
  const [branch_name, setBranch_Name] = useState("");

  const getApiData = async () => {
    try {
      const res = await axios.get("/api/branch?page=1&pageSize=10");
      setBranchList(res.data.data.docs);
    } catch (err) {
      console.log(console.log(err.message));
    }
  };

  const onSubmitHAndler = () => {
    if (branch_name.trim === "") return;

    let branchName = { branch_name };
    console.log({ branch_name });
    axios
      .post("/api/branch?page=1&pageSize=10", branchName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setBranch_Name("");
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <Card style={{ width: "80%" }}>
      <CardHeader>All</CardHeader>
      <ListGroup flush>
        {branchList.map((item, index) => {
          return (
            <ListGroupItem
              id={index}
              className="d-flex flex-row justify-content-between"
            >
              {item.branch_name}
              <div>
                <BranchList item={item.branch_name} id={index} />
                <FontAwesomeIcon icon="trash" />
              </div>
            </ListGroupItem>
          );
        })}

        <ListGroupItem className="d-flex justify-content-center">
          <Popup
            clicked={onSubmitHAndler}
            branch={branch_name}
            changed={(event) => setBranch_Name(event.target.value)}
          />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default Gener;
