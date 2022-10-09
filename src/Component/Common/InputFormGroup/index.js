import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const InputFormGroup = (props) => {
  const { label, name, data, userError, ...rest } = props;
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} value={data[name]} {...rest} />
      {userError ? <span>Fil Something</span> : ""}
    </FormGroup>
  );
};

export default InputFormGroup;
