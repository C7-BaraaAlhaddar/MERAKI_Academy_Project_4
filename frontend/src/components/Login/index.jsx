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

export default function Login() {
  return (
    <div className="login">
      <Container>
        <Card style={{ padding: "10px" }}>
          {" "}
          <Container
            style={{
              padding: "10px 50px",
              marginBottom: "10px",
            }}
          >
            <Card.Title style={{ fontSize: "50px" }}>Login</Card.Title>
          </Container>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
