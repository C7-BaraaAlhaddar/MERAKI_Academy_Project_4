import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Alert,
  Card,
  Stack,
  Modal,
  Collapse,
  Col,
  Row,
} from "react-bootstrap";
import { UserContext } from "../UserContext";

export default function UserProfile() {
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
  const [updateError, setUpdateError] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUserFunc = (e) => {
    e.preventDefault();
    if (
      e.target[0].value == "" ||
      e.target[1].value == "" ||
      e.target[2].value == "" ||
      e.target[3].value == "" ||
      e.target[4].value == "" ||
      e.target[5].value == "" ||
      e.target[6].value == ""
    ) {
      return setUpdateError("All fields are required");
    } else if (!validator.isEmail(e.target[2].value)) {
      return setUpdateError("Your Email is incorrect");
    }
    axios
      .put(
        `http://localhost:5000/user/${userId}`,
        {
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          email: e.target[2].value,
          password: e.target[3].value,
          address: e.target[4].value,
          age: e.target[5].value,
          phoneNumber: e.target[6].value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result.data.user);
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setUserData(result.data.user);
        setUserName(result.data.user.firstName);
        setEditProfile(!editProfile);
        setUpdateError(null);
      })
      .catch((error) => setUpdateError(error.response.date.message));
  };
  return (
    <Container>
      {" "}
      <Card>
        <Card.Header>
          <strong>{`${userData.firstName} ${userData.lastName}`}</strong>
        </Card.Header>
        <Card.Body>
          <div className="profile">
            <div className="profile-headers">
              {" "}
              <Stack gap={3}>
                <div className="bg-light border profile-field">First Name</div>
                <div className="bg-light border profile-field">Last Name</div>
                <div className="bg-light border profile-field">Age</div>
                <div className="bg-light border profile-field">Address</div>
                <div className="bg-light border profile-field">Email</div>
                <div className="bg-light border profile-field">
                  Phone Number
                </div>
              </Stack>
            </div>
            <div className="profile-data">
              {" "}
              <Stack gap={3}>
                <div className="bg-light border profile-field">
                  {userData.firstName}
                </div>
                <div className="bg-light border profile-field">
                  {userData.lastName}
                </div>
                <div className="bg-light border profile-field">
                  {userData.age}
                </div>
                <div className="bg-light border profile-field">
                  {userData.address}
                </div>
                <div className="bg-light border profile-field">
                  {userData.email}
                </div>
                <div className="bg-light border profile-field">
                  {userData.phoneNumber}
                </div>
              </Stack>
            </div>
          </div>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              onClick={() => setEditProfile(!editProfile)}
              variant="warning"
            >
              Edit profile
            </Button>
            <Button
              onClick={handleShow}
              variant="danger"
              style={{ marginRight: "10px" }}
            >
              Delete Account
            </Button>
          </div>
          <Collapse in={editProfile}>
            <Form onSubmit={updateUserFunc}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="updateFName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userData.firstName}
                    placeholder="First name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="updateLName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={userData.lastName}
                    placeholder="Last name"
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="updateEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={userData.email}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="updatePassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
                <Form.Text id="passwordHelpBlock" muted>
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="UpdateAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  defaultValue={userData.address}
                  placeholder="1234 Main St"
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="updateAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control defaultValue={userData.age} placeholder="Age" />
                </Form.Group>

                <Form.Group as={Col} controlId="updateNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    defaultValue={userData.phoneNumber}
                    placeholder="012 - 3456789"
                  />
                </Form.Group>
              </Row>
              {updateError && <Alert variant="danger">{updateError}</Alert>}

              <Button variant="warning" type="submit">
                Update Profile
              </Button>
            </Form>
          </Collapse>
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
    </Container>
  );
}
