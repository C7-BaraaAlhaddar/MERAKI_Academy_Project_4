import React from "react";
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
export default function Footer() {
  return (
    <Navbar
      bg="warning"
      className="py-2"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100vw",
        height: "2.5rem",
      }}
    >
      <p style={{ margin: "auto" }}>THIS IS THE FOOTER</p>
    </Navbar>
  );
}
