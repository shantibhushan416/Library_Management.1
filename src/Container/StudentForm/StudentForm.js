import React, { useState } from "react";
import Select from "react-select";
import { Form, Row, Col, Button, Label, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./StudentForm.css";
import InputFormGroup from "../../Component/Common/InputFormGroup";

const initialBookData = {
  bookName: "",
  author: "",
  selectedBranch: null,
  description: "",
  stock: 0,
  publisher: "",
};

const AddBookForm = (props) => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState(initialBookData);

  const handleChange = ({ target: { name, value } }) => {
    const cloneBookData = { ...bookData };
    cloneBookData[name] = value;
    setBookData(cloneBookData);
  };

  return (
    <div>
      <Form
        style={{ margin: "1rem  10rem", padding: "1rem 3rem" }}
        className="forms rounded-3 "
      >
        <Container
          fluid
          className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
        >
          <h1 className="text-center">Registration Form</h1>
          <Button onClick={() => navigate("/studentlist")}>Back-{">"}</Button>
        </Container>
        <Row>
          <Col md={4}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="bookName"
              placeholder="Enter Name"
              type="text"
              label="Student Name"
              autocomplete="off"
            />
          </Col>
          <Col md={4}>
            <Label>Branch</Label>
            <Select
              onChange={(value, { name }) =>
                handleChange({ target: { name, value } })
              }
              name="selectedBranch"
              value={bookData.selectedBranch}
              placeholder="Enter Branch "
            />
          </Col>
          <Col md={4}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="roll"
              placeholder="Enter Roll"
              type="text"
              label="Roll"
              autocomplete="off"
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="email"
              placeholder="Enter Email"
              type="email"
              label="Email"
              autocomplete="off"
            />
          </Col>
          <Col>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              placeholder="Enter Number"
              name="description"
              type="text"
              label="Number"
              autocomplete="off"
            />
          </Col>
          <Col md={4}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              placeholder="Enter Admission Year"
              name="admissionYear"
              type="date"
              label="Year"
              autocomplete="off"
            />
          </Col>
        </Row>

        <div className="d-flex flex-row d-flex flex-row justify-content-center">
          <Button>Register</Button>
        </div>
      </Form>
    </div>
  );
};
export default AddBookForm;
