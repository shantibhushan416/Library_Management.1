import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import axios from "../../Container/Axios/Axios";
import "react-table/react-table.css";
import "./Table.css";

export default function Table() {
  const [booklist, setBookList] = useState([]);
  const getApiData = async () => {
    try {
      const res = await axios.get(
        "https://librarybackendapp.herokuapp.com/api/book?page=1&pageSize=20"
      );
      console.log(res.data.data.docs);
      setBookList(res.data.data.docs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  const getColumns = () => {
    return [
      { Header: <strong>Books Name</strong>, accessor: "book_name" },
      { Header: <strong>Subject</strong>, accessor: "subject" },
      {
        Header: <strong>Action</strong>,
        Cell: (props) => (
          <div className="text-center">
            <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
            <FontAwesomeIcon icon={faTrash} />
          </div>
        ),

        accessor: "edit",
      },
    ];
  };

  return (
    <div>
      <ReactTable
        data={booklist}
        columns={getColumns()}
        minRows={5}
        defaultPageSize={10}
        className="Table -striped -highlight rounded-1 me-0"
        manual
        sortable={false}
        showPageSizeOptions={false}
        noDataText="No user found"
        pages={2}
        loading={false}
        page={0}
        onPageChange={() => {}}
      />
    </div>
  );
}
