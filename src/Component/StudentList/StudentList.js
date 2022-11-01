import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faBook,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { useNavigate } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";
import Search from "../Search/Search";
import DeleteModal from "../../Container/BranchModal/DeleteModal";
import IssueBook from "../../Container/IssueBookModal/IssueBook";
import "react-table/react-table.css";
import "./StudentList.css";
import axios from "../../Container/Axios/Axios";
import { getLocalStorageData } from "../../utils/utility";

export default function StudentList(props) {
  const isLogedIn = !!getLocalStorageData();

  const navigate = useNavigate();
  const [state, setState] = useState({
    pageNo: 1,
    pageSize: 10,
    search: "",
    selectedBranch: null,
    selectedStudent: null,
  });
  const [studentList, setStudentList] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [studentId, setStudentId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [addIssueOpen, setIssueModalOpen] = useState(false);

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async (params) => {
    const newState = { ...state, ...params };
    // if (!newState.search) delete newState.search;
    setState(newState);

    const { selectedBranch, selectedBook, ...restState } = newState;
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/student",
        params: {
          ...restState,
          branch: selectedBranch?.value,
          book_id: selectedBook?.value,
        },
      });
      console.log(data);
      //another methode to get by search
      // console.log(data);
      // setStudentList(data.data.docs);
      if (data.statusCode === 200) {
        const { docs, total } = data.data;
        setStudentList(docs);
        setTotalBooks(total);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getBranchList = async (params) => {
    const newState = { ...state, ...params };
    if (!newState.search) delete newState.search;
    setState(newState);
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/branch",
        params,
      });

      const branchList = data.data.map(({ _id, branch_name }) => {
        return { label: branch_name, value: _id };
      });
      return {
        options: branchList,
        hasMore: false,
      };
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadBookOption = async (search) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/book",
        params: { search },
      });
      const booklist = data.data.docs.map(({ _id, book_name }) => {
        return { label: book_name, value: _id };
      });
      console.log(booklist);
      return {
        options: booklist,
        hasMore: false,
      };
    } catch (err) {
      console.log(err.message);
    }
  };
  /*---------*/
  const handleDeleteBranch = (studentid) => {
    setStudentId(studentid);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  const onDeleteConfirmation = async () => {
    try {
      setActionLoader(true);
      const { data } = await axios.delete(`/api/student/${studentId}`);
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
  /*---------------*/
  const toggleIssueModal = () => {
    setIssueModalOpen((prev) => !prev);
  };

  const getColumns = () => {
    const coloumns = [
      { Header: <strong>Student Name</strong>, accessor: "full_name" },
      { Header: <strong>Branch</strong>, accessor: "branch.branch_name" },
      {
        Header: <strong>Issued Book</strong>,
        Cell: ({ original: { issued_books } }) => {
          return issued_books.map(({ book_name }) => book_name).join(",");
        },
      },
      { Header: <strong>Email</strong>, accessor: "email" },
      {
        Header: <strong>Action</strong>,
        coloumnName: "action",
        Cell: ({ original }) => {
          return (
            <div className="text-center">
              <FontAwesomeIcon
                onClick={() =>
                  navigate(`/studentlist/studentform/${original._id}`)
                }
                icon={faPenToSquare}
                className="me-2"
              />
              <FontAwesomeIcon
                onClick={() => handleDeleteBranch(original._id)}
                icon={faTrash}
                className="me-2"
              />
              <FontAwesomeIcon onClick={toggleIssueModal} icon={faBook} />
            </div>
          );
        },
      },
    ];
    return coloumns.filter(
      ({ coloumnName }) => isLogedIn || coloumnName !== "action"
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
      <IssueBook isOpen={addIssueOpen} toggle={toggleIssueModal} />

      <div
        className="d-flex  align-items-center me-3 ms-3 "
        style={{ height: "100vh" }}
      >
        <Card body className="mt-5">
          <CardTitle>
            <Container
              fluid
              className="bg-light d-flex flex-row justify-content-between  mb-2 p-0"
            >
              <h3 style={{ margin: "0" }}>Students</h3>
              <div className="d-flex flex-row justify-content-between">
                <Search
                  onChange={(search) => getStudentList({ search })}
                  name="studentName"
                  placeholder="Enter Student"
                  className="me-3"
                />
                <AsyncPaginate
                  onChange={(selectedBranch) =>
                    getStudentList({ selectedBranch })
                  }
                  name="selectedBranch"
                  placeholder="Enter Branch "
                  className="me-3"
                  loadOptions={getBranchList}
                  value={state.selectedBranch}
                  isClearable={true}
                />
                <AsyncPaginate
                  name="selectedBook"
                  onChange={(selectedBook) => getStudentList({ selectedBook })}
                  placeholder="Enter Book "
                  className="me-3"
                  loadOptions={loadBookOption}
                  value={state.selectedBook}
                  isClearable={true}
                />
                {isLogedIn ? (
                  <Button
                    onClick={() => navigate("/studentlist/studentform/new")}
                  >
                    Register
                  </Button>
                ) : null}
              </div>
            </Container>
          </CardTitle>
          <ReactTable
            data={studentList}
            columns={getColumns()}
            minRows={5}
            defaultPageSize={10}
            className="Table -striped -highlight rounded-1 m-3 text-center"
            manual
            sortable={false}
            showPageSizeOptions={false}
            noDataText="No Student Found"
            pages={Math.ceil(totalBooks / state.pageSize)}
            loading={false}
            page={state.pageNo - 1}
            onPageChange={(page) => getStudentList({ pageNo: page + 1 })}
          />
          <div className="d-flex flex-row justify-content-center">
            <Button onClick={() => navigate(-1)}>Back -{">"}</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
