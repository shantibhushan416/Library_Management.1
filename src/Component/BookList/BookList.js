import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getLocalStorageData } from "../../utils/utility";
import DeleteModal from "../../Container/BranchModal/DeleteModal";
import axios from "../../Container/Axios/Axios";
import "react-table/react-table.css";
import "./BookList.css";

export default function Table(props) {
  const { booklist, pageNo, pageSize, totalBooks, loading, onPageChange } =
    props;

  const navigate = useNavigate();
  const isLogedIn = !!getLocalStorageData();

  const [bookId, setBookId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);

  const handleDeleteBranch = (bookid) => {
    setBookId(bookid);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  const onDeleteConfirmation = async () => {
    try {
      setActionLoader(true);
      const { data } = await axios.delete(`/api/book/${bookId}`);
      if (data.statusCode === 200) {
        toggleDeleteModal();
        window.location.reload();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ response: { data } }) {
      toast.error(data.message);
    } finally {
      setActionLoader(false);
    }
  };

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
              <FontAwesomeIcon
                onClick={() => handleDeleteBranch(original._id)}
                icon={faTrash}
              />
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
    <>
      <DeleteModal
        actionLoader={actionLoader}
        isOpen={deleteModalOpen}
        toggle={toggleDeleteModal}
        onConfirmation={onDeleteConfirmation}
      />
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
          page={pageNo - 1} // its takes 0 as one
          onPageChange={(page) => onPageChange(page + 1)}
        />
      </div>
    </>
  );
}
