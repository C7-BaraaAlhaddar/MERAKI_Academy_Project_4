import React from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Col,
  Row,
  Card,
} from "react-bootstrap";
export default function index() {
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

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
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
