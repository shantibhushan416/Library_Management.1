import React from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./AddBookForm.css";
const AddBookForm = (props) => (
  <div className="back ">
    <h1 className="text-center">Add Book</h1>
    <Form
      style={{ margin: "1rem  10rem", padding: "1rem 3rem" }}
      className="form rounded-3 "
    >
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Book</Label>
            <Input
              className="borders"
              id="exampleName"
              name="BookName"
              placeholder="Book Name"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Author's Name</Label>
            <Input
              className="borders"
              id="exampleAuthor"
              name="Author"
              placeholder="Author's Name"
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleText">Discription Of the Book</Label>
        <Input
          className="borders"
          id="exampleText"
          name="text"
          type="textarea"
        />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePublisher">Publisher</Label>
            <Input className="borders" id="examplePublisher" name="publisher" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="branchName">Branch Name</Label>
            <Input className="borders" id="branchName" name="publishing-Year" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleStock">Stock</Label>
            <Input className="borders" id="exampleStock" name="stock" />
          </FormGroup>
        </Col>
      </Row>
      <Link to="/">
        <Button color="info">Submit</Button>
      </Link>
    </Form>
  </div>
);
export default AddBookForm;
