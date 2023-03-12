import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button, Form, Card, Dropdown, Alert } from "react-bootstrap";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const { categories, token } = useContext(UserContext);
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
                {pickedCategory ? pickedCategory.categoryName : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categories.map((category) => {
                  return (
                    <Dropdown.Item
                      key={category._id}
                      onClick={(e) => {
                        setPickedCategory(category);
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
            onSubmit={async (e) => {
              e.preventDefault();
              await uploadImage();
              if (!pickedCategory) {
                return setErrorMsg("Please choose a Category");
              }
              if (
                e.target[0].value == "" ||
                e.target[1].value == "" ||
                e.target[2].value == ""
              ) {
                return setErrorMsg("All fields are required");
              }
              if (
                pickedCategory.categoryName === "Mobiles" ||
                pickedCategory.categoryName === "Tablets"
              ) {
                axios
                  .post(
                    `http://localhost:5000/product`,
                    {
                      label: e.target[0].value,
                      brand: e.target[1].value,
                      price: e.target[2].value,
                      img: url,
                      category: pickedCategory._id,
                      specs: {
                        cpu: e.target[3].value,
                        ram: e.target[4].value,
                        battery: e.target[5].value,
                        memory: e.target[6].value,
                        frontCamera: e.target[7].value,
                        backCamera: e.target[8].value,
                        display: e.target[9].value,
                      },
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  )
                  .then((result) => {
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                    e.target[3].value = "";
                    e.target[4].value = "";
                    e.target[5].value = "";
                    e.target[6].value = "";
                    e.target[7].value = "";
                    e.target[8].value = "";
                    e.target[9].value = "";
                    setErrorMsg(null);
                    navigate("/dashboard/products");
                  })
                  .catch((error) => setErrorMsg(error.response.data.message));
              } else if (pickedCategory.categoryName === "Laptops") {
                axios
                  .post(
                    `http://localhost:5000/product`,
                    {
                      label: e.target[0].value,
                      brand: e.target[1].value,
                      price: e.target[2].value,
                      img: url,
                      category: pickedCategory._id,
                      specs: {
                        cpu: e.target[3].value,
                        ram: e.target[4].value,
                        gpu: e.target[5].value,
                        monitor: e.target[6].value,
                      },
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  )
                  .then((result) => {
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                    e.target[3].value = "";
                    e.target[4].value = "";
                    e.target[5].value = "";
                    e.target[6].value = "";

                    setErrorMsg(null);
                    navigate("/dashboard/products");
                  })
                  .catch((error) => setErrorMsg(error.response.data.message));
              } else {
                axios
                  .post(
                    `http://localhost:5000/product`,
                    {
                      label: e.target[0].value,
                      brand: e.target[1].value,
                      price: e.target[2].value,
                      img: url,
                      category: pickedCategory._id,
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  )
                  .then((result) => {
                    e.target[0].value = "";
                    e.target[1].value = "";
                    e.target[2].value = "";
                    setErrorMsg(null);
                    navigate("/dashboard/products");
                  })
                  .catch((error) => setErrorMsg(error.response.data.message));
              }
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
                {pickedCategory.categoryName === "Mobiles" ||
                pickedCategory.categoryName === "Tablets" ? (
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

                {pickedCategory.categoryName === "Laptops" && (
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
                }}
                type="file"
              />
            </Form.Group>

            <Button variant="warning" type="submit">
              Create product
            </Button>
          </Form>
          {errorMsg && (
            <Alert style={{ marginTop: "10px" }} variant="danger">
              {errorMsg}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
