import React from "react";
import "./Auth.css";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

const Auth = (props) => (
  <div className="Auth">
    <h1>Authentication</h1>
    <Card className="body" outline color="light">
      <CardBody>
        <Form className="Form">
          <Label for="exampleEmail">Email</Label>
          <FormGroup>
            <Input
              bsSize="lg"
              className="input"
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>
          <Label for="examplePassword">Password</Label>
          <FormGroup>
            <Input
              bsSize="lg"
              className="input"
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
          </FormGroup>{" "}
          <Button color="info">Sign In</Button>
        </Form>
      </CardBody>
    </Card>
  </div>
);
export default Auth;
