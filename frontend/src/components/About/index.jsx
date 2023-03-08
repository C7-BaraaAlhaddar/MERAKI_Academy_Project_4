import React from "react";
import { Accordion, Container } from "react-bootstrap";

export default function About() {
  return (
    <div style={{ margin: "10px" }}>
      <Container>
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                How much does the delivery cost ?
              </Accordion.Header>
              <Accordion.Body style={{ textAlign: "start" }}>
                Its free.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Where's our location?</Accordion.Header>
              <Accordion.Body style={{ textAlign: "start" }}>
                On the internet.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </div>
  );
}
