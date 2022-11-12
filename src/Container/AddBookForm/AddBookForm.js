import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Form, Row, Col, Button, Spinner, Label, Container } from "reactstrap";
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
  const isEditing = params.id !== "new";

  const [bookData, setBookData] = useState(initialBookData);
  const [errors, setErrors] = useState({});
  const [actionLoader, setActionLoader] = useState(false);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    getBrancList();
  }, []);

  useEffect(() => {
    (async () => {
      if (isEditing) {
        const details = await getBookDetails(params.id);
        const { book_name, author, branch, description, publisher, stock } =
          details;
        const selectedBranch = { label: branch.branch_name, value: branch._id };
        const bookData = {
          bookName: book_name,
          author,
          description,
          selectedBranch,
          publisher,
          stock,
        };

        setBookData(bookData);
      }
    })();
  }, [params]);

  //useEffect doesnot accept any asycn function as callback
  //if u have give useEffect asycn sunction then u have to use "IIFE"

  const handleChange = ({ target: { name, value } }) => {
    const cloneBookData = { ...bookData };
    console.log(value);
    if (typeof value === "string") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: "Required" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      if (value) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "Required" }));
      }
    }
    cloneBookData[name] = value;
    setBookData(cloneBookData);
  };
  console.log(errors);

  const onSubmitHAndler = async (e) => {
    e.preventDefault();
    const { bookName, author, selectedBranch, description, stock, publisher } =
      bookData;
    const body = {
      book_name: bookName,
      author,
      branch: selectedBranch?.value,
      description,
      stock,
      publisher,
    };

    try {
      setActionLoader(true);
      const { data } = isEditing
        ? await axios.put(`/api/book/${params.id}`, body)
        : await axios.post("/api/book", body);
      if (data.statusCode === 200) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoader(false);
    }
  };
  const getBrancList = async () => {
    try {
      const { data } = await axios.get("/api/branch");
      const branchList = data.data.map(({ _id, branch_name }) => {
        return { label: branch_name, value: _id };
      });

      setBranchList(branchList);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getBookDetails = async (bookId) => {
    try {
      const { data } = await axios.get(`/api/book/${bookId}`);
      return data.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Form
        onSubmit={onSubmitHAndler}
        style={{ margin: "1rem  10rem", padding: "1rem 3rem" }}
        className="forms rounded-3 "
      >
        <Container
          fluid
          className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
        >
          <h1 className="text-center">{`${
            isEditing ? "Edit" : "Add"
          } Book`}</h1>
          <Button onClick={() => navigate(-1)}>Back-{">"}</Button>
        </Container>
        <Row>
          <Col md={6}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="bookName"
              placeholder="Enter Book Name"
              type="text"
              label="Book"
              errors={errors}
              autocomplete="off"
            />
          </Col>
          <Col md={6}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              name="author"
              placeholder="Enter Author's Name"
              type="text"
              label="Author's Name"
              errors={errors}
              autocomplete="off"
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
              errors={errors}
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
              placeholder="Enter Branch Name"
              options={branchList}
              isClearable={true}
            />
            <span> {errors["selectedBranch"]}</span>
          </Col>
          <Col md={2}>
            <InputFormGroup
              onChange={handleChange}
              className="borders"
              data={bookData}
              placeholder="Enter Stock"
              name="stock"
              type="number"
              min={0}
              errors={errors}
              label="Stock"
              autocomplete="off"
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
            errors={errors}
            autocomplete="off"
          />
        </Row>

        <div className="d-flex flex-row d-flex flex-row justify-content-center">
          <Button>
            {actionLoader && (
              <Spinner className="me-2" size="sm">
                Loading
              </Spinner>
            )}
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default AddBookForm;
