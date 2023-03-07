import React from "react";
import { Navbar } from "react-bootstrap";
export default function Footer() {
  return (
    <Navbar
      bg="warning"
      className="py-2 footer"
      style={{
        position: "relative",
        bottom: "0",
        width: "100vw",
        height: "2.5rem",
      }}
    >
      <p style={{ margin: "auto" }}>THIS IS THE FOOTER</p>
    </Navbar>
  );
}
