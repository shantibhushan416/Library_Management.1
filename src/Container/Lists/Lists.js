import React from "react";
import {
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import { Navigate, Link } from "react-router-dom";
import Genre from "../../Component/Gener/Gener";
import Table from "../../Component/Table/Table";
import "./Lists.css";

const List = (props) => {
  return (
    <>
      <Container fluid className=" mt-3">
        <Row>
          <Col sm="4">
            <Card body>
              <CardTitle className="bg-light">
                <h3>Branch</h3>
              </CardTitle>
              <Genre />
            </Card>
          </Col>
          <Col>
            <Card body>
              <CardTitle>
                <Container
                  fluid
                  className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
                >
                  <h3 style={{ margin: "0" }}>Book List</h3>

                  <div className="d-flex flex-row">
                    <Input
                      placeholder="search-book"
                      style={{ width: "9rem", marginRight: "1rem" }}
                    />
                    <Link to="/add-book">
                      <Button color="primary">Add Books</Button>
                    </Link>
                  </div>
                </Container>
              </CardTitle>
              <Table />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default List;
