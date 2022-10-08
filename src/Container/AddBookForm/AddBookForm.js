import React, { useEffect, useState } from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Axios/Axios";

import "./AddBookForm.css";
const AddBookForm = (props) => {
  const [branchList, setBranchList] = useState([]);
  const [book_name, setBook_Name] = useState("");
  const [branch_id, setBook_id] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");

  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
    onSubmitHAndler();
    getApiData();
  };
  const getApiData = async () => {
    try {
      await axios.get("/api/book?page=1&pageSize=20");
    } catch (err) {
      console.log(err);
    }
  };

  const getApiDatas = async () => {
    try {
      const res = await axios.get("/api/branch?page=1&pageSize=10");
      console.log(res.data.data.docs);
      setBranchList(res.data.data.docs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiData();
    getApiDatas();
  }, []);

  const onSubmitHAndler = async () => {
    let item = { book_name, branch_id, author, publisher, stock, description };

    console.log(item);
    try {
      const res = await axios.post("/api/book/", item);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-center">Add Book</h1>
      <Form
        style={{ margin: "1rem  10rem", padding: "1rem 3rem" }}
        className="forms rounded-3 "
      >
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Book</Label>
              <Input
                onChange={(e) => setBook_Name(e.target.value)}
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
                onChange={(e) => setAuthor(e.target.value)}
                className="borders"
                id="exampleAuthor"
                name="Author"
                placeholder="Author's Name"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePublisher">Publisher</Label>
              <Input
                onChange={(e) => setPublisher(e.target.value)}
                className="borders"
                id="examplePublisher"
                name="publisher"
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="branchName">Branch Name</Label>
              <Input
                onChange={(e) => setBook_id(e.target.value)}
                className="borders"
                id="branchName"
                name="publishing-Year"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleStock">Stock</Label>
              <Input
                onChange={(e) => setStock(e.target.value)}
                className="borders"
                id="exampleStock"
                name="stock"
                type="number"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleText">Description Of the Book</Label>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            className="borders"
            id="exampleText"
            name="text"
            type="textarea"
          />
        </FormGroup>
        <div className="d-flex flex-row d-flex flex-row justify-content-center">
          <Button onClick={goToHomePage}>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
export default AddBookForm;
