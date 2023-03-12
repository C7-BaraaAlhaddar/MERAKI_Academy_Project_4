import React, { useContext, useState, useEffect } from "react";
import { Card, Button, ListGroup, Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
export default function UsersDashboard() {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.users);
        setUsers(
          result.data.users.filter(
            (user) => user.role !== "6404d204f0e7a330ba3c57ba"
          )
        );
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);
  return (
    <div>
      {users ? (
        <>
          {users.map((user) => {
            return (
              <Card key={user._id} style={{ marginBottom: "10px" }}>
                <Card.Header>
                  <Card.Text>
                    <strong>{`${user.firstName} ${user.lastName}`}</strong>{" "}
                  </Card.Text>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>User : </strong>{" "}
                      {`${user.firstName} ${user.lastName}`}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Address : </strong> {`${user.address} `}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Number : </strong> {`${user.phoneNumber} `}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email : </strong> {`${user.email} `}{" "}
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    onClick={(e) => setShow(user._id)}
                    variant="danger"
                    style={{ margin: "10px 0 0 10px" }}
                  >
                    Delete User
                  </Button>
                </Card.Body>
                <Modal show={show === user._id} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <strong>{`${user.firstName} ${user.lastName}`}</strong>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure that you want to delete this user
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        axios
                          .delete(`http://localhost:5000/user/${user._id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          })
                          .then((result) => {
                            setUsers(users.filter((e) => e._id !== user._id));
                            handleClose();
                          })
                          .catch((error) =>
                            console.log(error.response.data.message)
                          );
                      }}
                    >
                      Delete User
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <div>No Orders Yet</div>
        </>
      )}
    </div>
  );
}
