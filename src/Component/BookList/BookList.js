import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { useNavigate } from "react-router-dom";
import "react-table/react-table.css";
import "./BookList.css";
import { getLocalStorageData } from "../../utils/utility";

export default function Table(props) {
  const { booklist, pageNo, pageSize, totalBooks, loading, onPageChange } =
    props;

  const navigate = useNavigate();
  const isLogedIn = !!getLocalStorageData();

  const getColumns = () => {
    const coloumns = [
      { Header: <strong>Books Name</strong>, accessor: "book_name" },
      { Header: <strong>Branch Name</strong>, accessor: "branch.branch_name" },
      { Header: <strong>Author</strong>, accessor: "author" },
      { Header: <strong>Publisher</strong>, accessor: "publisher" },
      { Header: <strong>Stock</strong>, accessor: "stock" },
      { Header: <strong>Issued</strong>, accessor: "issued" },
      {
        Header: <strong>Action</strong>,
        columnName: "action",
        Cell: ({ original }) => {
          return (
            <div className="text-center">
              <FontAwesomeIcon
                onClick={() => navigate(`/add-book/${original._id}`)}
                icon={faPenToSquare}
                className="me-2"
              />
              <FontAwesomeIcon icon={faTrash} />
            </div>
          );
        },
      },
    ];

    return coloumns.filter(
      ({ columnName }) => isLogedIn || columnName !== "action"
    );
  };

  return (
    <div>
      <ReactTable
        data={booklist}
        columns={getColumns()}
        minRows={5}
        defaultPageSize={10}
        className="Table -striped -highlight rounded-1 me-0 text-center"
        manual
        sortable={false}
        showPageSizeOptions={false}
        noDataText="No book found"
        pages={Math.ceil(totalBooks / pageSize)}
        loading={loading}
        page={pageNo - 1}
        onPageChange={(page) => onPageChange(page + 1)}
      />
    </div>
  );
}
