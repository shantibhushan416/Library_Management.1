import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BranchList = (props) => {
  const { toEditId, edit, id, item } = props;
  return (
    <>
      {id === toEditId ? (
        <input value={item}></input>
      ) : (
        <FontAwesomeIcon
          onClick={() => edit(item)}
          icon={faPenToSquare}
          className="me-1 hover:red "
        />
      )}
    </>
  );
};

export default BranchList;
