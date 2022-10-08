import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { useNavigate } from "react-router-dom";
import "react-table/react-table.css";
import "./Table.css";

export default function Table(props) {
  const { booklist, pageNo, pageSize, totalBooks, loading, onPageChange } =
    props;

  const navigate = useNavigate();

  const getColumns = () => {
    return [
      { Header: <strong>Books Name</strong>, accessor: "book_name" },
      { Header: <strong>Author</strong>, accessor: "author" },
      { Header: <strong>Publisher</strong>, accessor: "publisher" },
      { Header: <strong>Description</strong>, accessor: "description" },
      { Header: <strong>Stock</strong>, accessor: "stock" },
      {
        Header: <strong>Action</strong>,
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
