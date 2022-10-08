import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const InputFormGroup = (props) => {
  const { label, name, data, ...rest } = props;
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} value={data[name]} {...rest} />
    </FormGroup>
  );
};

export default InputFormGroup;
