import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { useNavigate } from "react-router-dom";
import "react-table/react-table.css";
import "./StudentList.css";
import axios from "../../Container/Axios/Axios";

export default function StudentList(props) {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = async () => {
    try {
      const { data } = await axios.get("/api/student/");
      console.log(data.data.docs);
      setStudentList(data.data.docs);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getColumns = () => {
    return [
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
        Cell: () => {
          return (
            <div className="text-center">
              <FontAwesomeIcon
                onClick={() => navigate(`/studentform`)}
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
      <Card body>
        <CardTitle>
          <Container
            fluid
            className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
          >
            <h3 style={{ margin: "0" }}>Students</h3>
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
          pages={2}
          loading={false}
          page={1}
          onPageChange={() => 1}
        />
        <div className="d-flex flex-row justify-content-center">
          <Button onClick={() => navigate(-1)}>Back -{">"}</Button>
        </div>
      </Card>
    </div>
  );
}
