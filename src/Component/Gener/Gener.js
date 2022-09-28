import React, { useEffect, useState } from "react";

import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BranchList from "../../Container/BranchList/BranchList";
import Popup from "../../Container/Modal/Modal";
import axios from "../../Container/Axios/Axios";
import "./Gener.css";

const Gener = (props) => {
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/branch?page=1&pageSize=10")
      .then((res) => {
        console.log(res.data.data.docs);
        setBranchList(res.data.data.docs);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Popup />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default Gener;
