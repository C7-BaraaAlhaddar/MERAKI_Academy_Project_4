import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import validator from "validator";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";

export default function UpdateUser() {
  const { id } = useParams();
  const [updateError, setUpdateError] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const navigate = useNavigate();
  const { token, userId, userName, setUserName, userData, setUserData } =
    useContext(UserContext);
  const updateUserFunc = (e) => {
    e.preventDefault();
    if (
      e.target[0].value == "" ||
      e.target[1].value == "" ||
      e.target[2].value == "" ||
      e.target[3].value == "" ||
      e.target[4].value == "" ||
      e.target[5].value == ""
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
          address: e.target[3].value,
          age: e.target[4].value,
          phoneNumber: e.target[5].value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        setUserData(result.data.user);
        setUserName(result.data.user.firstName);
        setEditProfile(!editProfile);
        setUpdateError(null);
        navigate(`/profile/${id}`);
      })
      .catch((error) => setUpdateError(error.response.date.message));
  };
  return (
    <div>
      <Card>
        <Card.Body>
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
        </Card.Body>
      </Card>
    </div>
  );
}
