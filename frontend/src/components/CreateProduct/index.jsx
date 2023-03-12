import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button, Form, Card, Dropdown } from "react-bootstrap";

export default function CreateProduct() {
  const { categories } = useContext(UserContext);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fifrrlff");
    data.append("cloud_name", "dilqog4u7");
    fetch("http://api.cloudinary.com/v1_1/dilqog4u7/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <strong>Create a new product</strong>
        </Card.Header>
        <Card.Body>
          <div style={{ display: "flex" }}>
            {" "}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target[0]);
            }}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Product brand</Form.Label>
              <Form.Control type="text" placeholder="Product brand" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Product price</Form.Label>
              <Form.Control type="number" placeholder="price" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploadImage();
                }}
                type="file"
              />
            </Form.Group>

            <Button type="submit">submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
