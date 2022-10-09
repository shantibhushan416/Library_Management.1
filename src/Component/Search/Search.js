import React from "react";
import { Input } from "reactstrap";

const Search = (props) => {
  return (
    <div>
      <Input
        onChange={props.onChange}
        placeholder="search-book"
        type="search"
        style={{ width: "9rem", marginRight: "1rem" }}
      ></Input>
    </div>
  );
};

export default Search;
