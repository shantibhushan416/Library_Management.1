import React, { useEffect, useState } from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Axios/Axios";
import "./AddBookForm.css";
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
  const params = useParams();
  const navigate = useNavigate();

  const [branchList, setBranchList] = useState([]);
  const [bookData, setBookData] = useState(initialBookData);

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

  const handleChange = ({ target }) => {
    const { name, value } = target;

    const cloneBookData = { ...bookData };
    cloneBookData[name] = value;
    setBookData(cloneBookData);
  };

  const onSubmitHAndler = async () => {
    const { bookName, author, selectedBranch, description, stock, publisher } =
      bookData;
    const body = {
      book_name: bookName,
      author,
      branch: selectedBranch,
      description,
      stock,
      publisher,
    };

    try {
      const res = await axios.post("/api/book/", body);
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
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="bookName"
              placeholder="Book Name"
              type="email"
              label="Book"
            />
          </Col>
          <Col md={6}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="author"
              placeholder="Author's Name"
              type="text"
              label="Author's Name"
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="publisher"
              placeholder="Enter Publisher"
              type="text"
              label="Publisher"
            />
          </Col>
          <Col md={4}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="selectedBranch"
              label="BranchId"
            />
          </Col>
          <Col md={2}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              placeholder="Enter Stock"
              name="stock"
              type="number"
              label="Stock"
            />
          </Col>
        </Row>
        <Row>
          <InputFormGroup
            onChange={handleChange}
            className="borders"
            data={bookData}
            placeholder="Enter Description"
            name="description"
            type="textarea"
            label="Description"
          />
        </Row>

        <div className="d-flex flex-row d-flex flex-row justify-content-center">
          <Button onClick={goToHomePage}>Submit</Button>
        </div>
      </Form>
    </div>
  );
};
export default AddBookForm;
