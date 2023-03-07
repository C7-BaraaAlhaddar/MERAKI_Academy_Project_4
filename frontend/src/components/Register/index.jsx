import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import {
  Button,
  Container,
  Form,
  Alert,
  Col,
  Row,
  Card,
} from "react-bootstrap";

export default function Register() {
  const googleLoginSuccess = (data) => {
    console.log(jwt_decode(data.credential));
    const { email, given_name, family_name, sub } = jwt_decode(data.credential);
    axios
      .post("http://localhost:5000/user/register", {
        firstName: given_name,
        lastName: family_name,
        email: email,
        password: sub,
        address: "No address",
        age: 20,
        phoneNumber: "No Phone Number",
        role: "6404d1f5f0e7a330ba3c57b8",
      })
      .then((result) => {
        setRegisterError(null);
        navigate("/login");
      })
      .catch((error) => {
        setRegisterError(error.response.data.message);
      });
  };
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null);

  const registerFunc = (e) => {
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
      return setRegisterError("All fields are required");
    } else if (!validator.isEmail(e.target[2].value)) {
      return setRegisterError("Your Email is incorrect");
    }

    axios
      .post("http://localhost:5000/user/register", {
        firstName: e.target[0].value,
        lastName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
        address: e.target[4].value,
        age: e.target[5].value,
        phoneNumber: e.target[6].value,
        role: "6404d1f5f0e7a330ba3c57b8",
      })
      .then((result) => {
        setRegisterError(null);
        navigate("/login");
      })
      .catch((error) => {
        setRegisterError(error.response.data.message);
      });
  };
  return (
    <div className="register">
      {" "}
      <Container>
        <Card style={{ padding: "10px" }}>
          <Container
            style={{
              padding: "10px 50px",
              marginBottom: "10px",
            }}
          >
            <Card.Title style={{ fontSize: "50px" }}>Sign Up</Card.Title>
          </Container>

          <Form onSubmit={registerFunc}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="registerFName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First name" />
              </Form.Group>

              <Form.Group as={Col} controlId="registerLName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="registerrEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="registerAge">
                <Form.Label>Age</Form.Label>
                <Form.Control placeholder="Age" />
              </Form.Group>

              <Form.Group as={Col} controlId="registerPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="012 - 3456789" />
              </Form.Group>
            </Row>
            {registerError && <Alert variant="danger">{registerError}</Alert>}

            <Button variant="warning" type="submit">
              Sign Up
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <GoogleLogin
                onSuccess={googleLoginSuccess}
                onError={(errorMessage) => {
                  console.log(errorMessage);
                }}
              />
            </div>
            <Card.Text
              style={{ fontSize: "15px", padding: "5px", margin: "5px" }}
            >
              Already Have an account ? <Link to="/login">Login</Link>
            </Card.Text>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
