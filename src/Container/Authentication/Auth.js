import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import "./Auth.css";

const Auth = (props) => {
  const navigate = useNavigate();
  const goToAuth = () => {
    navigate("/");
  };

  return (
    <div className="Auth">
      <h1>Authentication</h1>
      <Card className="body" outline color="light">
        <CardBody>
          <Form className="Form">
            <Label for="exampleEmail">Email</Label>
            <FormGroup>
              <Input
                className="input"
                id="exampleEmail"
                name="email"
                type="email"
              />
            </FormGroup>
            <Label for="examplePassword">Password</Label>
            <FormGroup>
              <Input
                className="input"
                id="examplePassword"
                name="password"
                type="password"
              />
            </FormGroup>{" "}
            <div className="button">
              <Button onClick={goToAuth}>Sign In</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Auth;
