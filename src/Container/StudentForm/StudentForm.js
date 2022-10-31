import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { Form, Button, Label, Container, Spinner } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../Axios/Axios";
import InputFormGroup from "../../Component/Common/InputFormGroup";
import "./StudentForm.css";

const initialStudentData = {
  studentName: "",
  selectedBranch: null,
  email: "",
};

const AddBookForm = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = params.id !== "new";

  const [studentData, setStudentData] = useState(initialStudentData);
  const [actionLoader, setActionLoader] = useState(false);

  useEffect(() => {
    if (isEditing) {
      (async () => {
        const { data } = await getStudentDetails(params.id);
        console.log(data);
        const { full_name, email, branch } = data;
        const selectedBranch = { label: branch.branch_name, value: branch._id };
        const newStudentData = {
          studentName: full_name,
          email,
          selectedBranch,
        };
        setStudentData(newStudentData);
      })();
    }
  }, [params]);

  const getStudentDetails = async (studentId) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/student/${studentId}`,
      });
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  const getBranchList = async (search) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/branch",
        params: { search },
        //params are sent instead of & and ?
      });

      const branchList = data.data.map(({ _id, branch_name }) => {
        return { label: branch_name, value: _id };
      });

      return {
        options: branchList,
        hasMore: false,
      };
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const cloneStudentData = { ...studentData };
    cloneStudentData[name] = value;
    setStudentData(cloneStudentData);
  };

  const onSubmitHAndler = async (e) => {
    e.preventDefault();
    const { studentName, selectedBranch, email } = studentData;
    const body = {
      full_name: studentName,
      branch: selectedBranch?.value,
      email,
    };
    try {
      setActionLoader(true);
      const { data } = isEditing
        ? await axios.put(`/api/student/${params.id}`, body)
        : await axios.post("/api/student", body);
      if (data.statusCode === 200) {
        toast.success(data.message);
        navigate("/studentlist");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setActionLoader(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div>
        <Form
          onSubmit={onSubmitHAndler}
          style={{
            // margin: "1rem  10rem",
            padding: "1rem 3rem",
            width: "600px",
          }}
          className="forms rounded-3 "
        >
          <Container
            fluid
            className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
          >
            <h3 className="text-center">{`${
              isEditing ? "Edit" : "Registration"
            } Form`}</h3>
            <Button onClick={() => navigate(-1)}>Back-{">"}</Button>
          </Container>
          <div>
            <InputFormGroup
              onChange={handleChange}
              data={studentData}
              name="studentName"
              placeholder="Enter Name"
              type="text"
              label="Student Name"
            />
            <Label>Branch</Label>
            <AsyncPaginate
              onChange={(value, { name }) =>
                handleChange({ target: { name, value } })
              }
              name="selectedBranch"
              className="mb-3"
              value={studentData.selectedBranch}
              placeholder="Enter Branch "
              loadOptions={getBranchList}
            />
            <InputFormGroup
              onChange={handleChange}
              data={studentData}
              name="email"
              placeholder="Enter Email"
              type="email"
              label="Email"
            />
          </div>
          <div className="d-flex flex-row d-flex flex-row justify-content-center">
            <Button>
              {actionLoader && (
                <Spinner className="me-2" size="sm">
                  Loading
                </Spinner>
              )}
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AddBookForm;
