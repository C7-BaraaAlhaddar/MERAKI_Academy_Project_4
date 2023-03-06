import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
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
      .post("localhost:5000/user/register", {
        firstName: e.target[0].value,
        LastName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
        address: e.target[4].value,
        age: e.target[5].value,
        phoneNumber: e.target[0].value,
        role: "6404d1f5f0e7a330ba3c57b8",
      })
      .then((result) => {
        setRegisterError(null);
        navigate("/login");
      })
      .catch((error) => setRegisterError(error.response.data.message));
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
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last name" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Age</Form.Label>
                <Form.Control placeholder="Age" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="012 - 3456789" />
              </Form.Group>
            </Row>
            {registerError && <Alert variant="danger">{registerError}</Alert>}

            <Button variant="warning" type="submit">
              Register
            </Button>
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
