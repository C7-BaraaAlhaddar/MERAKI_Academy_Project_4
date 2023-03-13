import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import validator from "validator";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  ListGroup,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

export default function UserUpdatePassword() {
  const { id } = useParams();
  const [updateError, setUpdateError] = useState(null);
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
  return (
    <div>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.target[0].value === "" || e.target[1].value === "") {
                return setUpdateError("All fields are required");
              }
              if (e.target[0].value !== e.target[1].value) {
                return setUpdateError(`Passwords didn't match`);
              }
              axios
                .put(
                  `http://localhost:5000/user/${userId}`,
                  {
                    password: e.target[0].value,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((result) => {
                  e.target[0].value = "";
                  e.target[1].value = "";

                  setUpdateError(null);
                  navigate(`/profile/${id}`);
                })
                .catch((error) => console.log(error.response.data.message));
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Rewrite new password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="warning" type="submit">
              Update Password
            </Button>
          </Form>
          <br />
          {updateError && <Alert variant="danger">{updateError}</Alert>}
        </Card.Body>
      </Card>
    </div>
  );
}
