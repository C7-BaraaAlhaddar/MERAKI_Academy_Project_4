import React, { useEffect, useContext, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Card,
} from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";
import Orders from "../orders";

export default function Dashboard() {
  const { userRole } = useContext(UserContext);
  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <div className="row">
        <div className="col-md-3" style={{ marginBottom: "10px" }}>
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item
                  onClick={(e) => navigate("/dashboard")}
                  className="list-filter"
                >
                  Orders
                </ListGroup.Item>
                <ListGroup.Item className="list-filter">Users</ListGroup.Item>
                <ListGroup.Item className="list-filter">
                  Products
                </ListGroup.Item>
                <ListGroup.Item className="list-filter">
                  Add a new Product
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>{" "}
        <div className="col-md">
          {" "}
          <Routes>
            <Route path="/" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Container>
  );
}
