import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Button, Container, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import InputFormGroup from "../../Component/Common/InputFormGroup";
import axios from "../Axios/Axios";
import { getLocalStorageData, setLocalStorageData } from "../../utils/utility";
import "./Auth.css";

const logInData = {
  email: "",
  password: "",
};

const Auth = (props) => {
  const navigate = useNavigate();

  const [logIn, SetLogIn] = useState(logInData);
  const [errors, setErrors] = useState({});
  const [actionLoader, setActionLoader] = useState(false);

  useEffect(() => {
    const isLogedIn = !!getLocalStorageData();

    if (isLogedIn) {
      navigate("/");
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    const clonelogInData = { ...logIn };
    if (typeof value === "string") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: "Required" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
    clonelogInData[name] = value;
    SetLogIn(clonelogInData);
  };

  const doLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logIn;
    const body = {
      email,
      password,
    };
    try {
      setActionLoader(true);
      const { data } = await axios.post("/api/librarian/login", body);
      console.log(data);
      if (data.statusCode === 200) {
        setLocalStorageData(data.data);
        toast.success(data.message);
        navigate("/");
      }
      console.log();
    } catch ({ response }) {
      toast.error(response?.data?.message || "something went wrong");
    } finally {
      setActionLoader(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <Form
          onSubmit={doLogin}
          style={{
            margin: "1rem  10rem",
            padding: "1rem 3rem",
            width: "400px",
          }}
          className="forms rounded-3 mt-10"
        >
          <Container fluid className="bg-light text-center ">
            <h3 className="text-center">Log in</h3>
          </Container>
          <Row>
            <InputFormGroup
              onChange={handleChange}
              data={logIn}
              name="email"
              placeholder="Enter Email"
              errors={errors}
              type="email"
              label="Email"
            />
          </Row>
          <Row>
            <InputFormGroup
              onChange={handleChange}
              data={logIn}
              name="password"
              placeholder="Enter Password"
              errors={errors}
              type="password"
              label="Password"
            />
          </Row>
          <div className="d-flex flex-row d-flex flex-row justify-content-center">
            <Button style={{ width: "332px" }} color="primary">
              {actionLoader && (
                <Spinner className="me-2" size="sm">
                  Loading
                </Spinner>
              )}
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
