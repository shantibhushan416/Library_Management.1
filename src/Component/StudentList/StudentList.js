import React from "react";
import { Container, Button, Card, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { useNavigate } from "react-router-dom";
import "react-table/react-table.css";
import "./StudentList.css";

export default function StudentList(props) {
  const navigate = useNavigate();

  const getColumns = () => {
    return [
      { Header: <strong>Student Name</strong>, accessor: "student" },
      { Header: <strong>Branch</strong>, accessor: "branch" },
      { Header: <strong>Roll No</strong>, accessor: "roll" },
      { Header: <strong>Year</strong>, accessor: "year" },
      {
        Header: <strong>Action</strong>,
        Cell: ({ original }) => {
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
            <h3 style={{ margin: "0" }}>Student</h3>

            <Button color="primary" onClick={() => navigate("/studentform")}>
              Registration
            </Button>
          </Container>
        </CardTitle>
        <ReactTable
          data={[
            {
              student: "Shanti",
              branch: "Electronics",
              roll: "444",
              year: "1st",
            },
          ]}
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
          <Button>Back -{">"}</Button>
        </div>
      </Card>
    </div>
  );
}
