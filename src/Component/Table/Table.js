import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./Table.css";
export default function Table() {
  const getColumns = () => {
    return [
      { Header: <strong>Books Name</strong>, accessor: "name" },
      { Header: <strong>Subject</strong>, accessor: "subject" },
      {
        Header: <strong>Action</strong>,
        Cell: (props) => (
          <div>
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
        data={[
          {
            name: "Quantam Phycics",
            subject: "Physics",
            edit: <FontAwesomeIcon icon={faPenToSquare} />,
          },
        ]}
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
