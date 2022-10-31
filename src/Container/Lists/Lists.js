import React, { useEffect, useState } from "react";
import { Card, CardTitle, Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BranchList from "../../Component/BranchList/BranchList";
import Booklist from "../../Component/BookList/BookList";
import Search from "../../Component/Search/Search";
import axios from "../Axios/Axios";
import "./Lists.css";
import { getLocalStorageData } from "../../utils/utility";

const List = (props) => {
  const navigate = useNavigate();
  const isLogedIn = !!getLocalStorageData();

  const [state, setState] = useState({ pageNo: 1, pageSize: 10, search: "" });
  const [booklist, setBookList] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookList();
  }, []);

  const getBookList = async (newData) => {
    const newState = { ...state, ...newData };

    if (!newState.search) delete newState.search;

    setState(newState);
    try {
      setLoading(true);
      const { data } = await axios({
        method: "GET",
        url: "/api/book",
        params: newState,
      });
      console.log(data);

      if (data.statusCode === 200) {
        const { docs, total } = data.data;
        setBookList(docs);
        setTotalBooks(total);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const goToBookForm = () => {
    navigate("/add-book/new");
  };

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center "
        style={{ width: "100%", height: "95vh" }}
      >
        <Row>
          <Col sm="4">
            <Card body>
              <CardTitle className="bg-light">
                <h3>Branch</h3>
              </CardTitle>
              <BranchList />
            </Card>
          </Col>
          <Col>
            <Card body>
              <CardTitle>
                <Container
                  fluid
                  className="bg-light d-flex flex-row justify-content-between align-items-center mb-2 p-0"
                >
                  <h3 style={{ margin: "0" }}>Book List</h3>

                  <div className="d-flex flex-row">
                    <Search onChange={(search) => getBookList({ search })} />
                    {isLogedIn ? (
                      <Button color="primary" onClick={goToBookForm}>
                        Add Books
                      </Button>
                    ) : null}
                  </div>
                </Container>
              </CardTitle>
              <Booklist
                {...state}
                booklist={booklist}
                totalBooks={totalBooks}
                loading={loading}
                onPageChange={(pageNo) => getBookList({ pageNo })}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default List;
