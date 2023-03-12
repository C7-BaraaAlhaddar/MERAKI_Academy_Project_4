import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button, Form, Card, Dropdown } from "react-bootstrap";

export default function CreateProduct() {
  const { categories } = useContext(UserContext);
  const [pickedCategory, setPickedCategory] = useState(null);
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
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      onClick={(e) => {
                        setPickedCategory(category.categoryName);
                      }}
                    >
                      {category.categoryName}
                    </Dropdown.Item>
                  );
                })}
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
            {pickedCategory ? (
              <>
                {pickedCategory === "Mobiles" ||
                pickedCategory === "Tablets" ? (
                  <>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>CPU</Form.Label>
                      <Form.Control type="text" placeholder="Product cpu" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> RAM</Form.Label>
                      <Form.Control type="text" placeholder="Product ram" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Battery</Form.Label>
                      <Form.Control type="text" placeholder="Product battery" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Storage</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product storage"
                      />{" "}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Front Camera</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product front camer"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Rear Camera</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Product rear camera"
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Display</Form.Label>
                      <Form.Control type="text" placeholder="Product Display" />
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}

                {pickedCategory === "Laptops" && (
                  <>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>CPU</Form.Label>
                      <Form.Control type="text" placeholder="Product cpu" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> RAM</Form.Label>
                      <Form.Control type="text" placeholder="Product ram" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> GPU</Form.Label>
                      <Form.Control type="text" placeholder="Product gpu" />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label> Monitor</Form.Label>
                      <Form.Control type="text" placeholder="Product Monitor" />
                    </Form.Group>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
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

            <Button variant="warning" type="submit">
              submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
