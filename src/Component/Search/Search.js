import React from "react";
import { Input } from "reactstrap";

const Search = (props) => {
  return (
    <div>
      <Input
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="search-book"
        type="search"
        style={{ width: "9rem", marginRight: "1rem" }}
      ></Input>
    </div>
  );
};

export default Search;
