import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const InputFormGroup = (props) => {
  const { label, name, data, errors, ...rest } = props;
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} value={data[name]} {...rest} />
      <span>{errors[name]}</span>
    </FormGroup>
  );
};

export default InputFormGroup;
