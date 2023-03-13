import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Modal, Button } from "react-bootstrap";
export default function UserInfo() {
  const navigate = useNavigate();
  const {
    token,
    setToken,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    setCart,
    userName,
    setUserName,
    userRole,
    setUserRole,
    userData,
    setUserData,
  } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <strong>Full Name</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>{`${userData.firstName} ${userData.lastName}`}</strong>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <strong>Email</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>{`${userData.email}`}</strong>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <strong>Phone Number</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>{`${userData.phoneNumber}`}</strong>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <strong>Age</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>{`${userData.age}`}</strong>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <strong>Address</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <strong>{`${userData.address}`}</strong>
            </ListGroup.Item>
          </ListGroup>
          <br />
          <Button
            onClick={handleShow}
            variant="danger"
            style={{ marginRight: "10px" }}
          >
            Delete Account
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              axios
                .delete(`http://localhost:5000/user/${userId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                  setIsLoggedIn(false);
                  setUserId(null);
                  setToken(null);
                  setUserName(null);
                  setUserRole(null);
                  localStorage.clear();
                  navigate("/");
                })
                .catch((error) => console.log(error.response.data.message));
            }}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
