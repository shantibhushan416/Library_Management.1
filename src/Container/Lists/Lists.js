import React from "react";
import "./Lists.css";
import { Card, CardTitle, Container, Row, Col, Button } from "reactstrap";
import Genre from "../../Component/Gener/Gener";
import Table from "../../Component/Table/Table";

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

                  <Button color="primary">Add Books</Button>
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
