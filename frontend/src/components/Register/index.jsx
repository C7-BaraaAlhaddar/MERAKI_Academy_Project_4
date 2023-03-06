import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { UserContext, UserContextProvider } from "../UserContext/index";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Col,
  Row,
  Card,
} from "react-bootstrap";

export default function Register() {
  const [registerError, setRegisterError] = useState(null);

  const registerFunc = (e) => {
    e.preventDefault();
    console.log(validator.isEmail("foo@bar.com"));
    console.log(e.target[0]);
    console.log(e.target[1]);
    console.log(e.target[2]);
    console.log(e.target[3]);
    console.log(e.target[4]);
    console.log(e.target[5]);
    console.log(e.target[6]);
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
    } else if (validator.isEmail(e.target[2].value)) {
      return setRegisterError("Your Email is incorrect");
    }
    axios.post("localhost:5000/user/register", {
      firstName: e.target[0].value,
      LastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      address: e.target[4].value,
      age: e.target[5].value,
      phoneNumber: e.target[0].value,
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
              <Form.Control type="email" placeholder="Enter email" />
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

            <Button variant="warning" type="submit">
              Register
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
