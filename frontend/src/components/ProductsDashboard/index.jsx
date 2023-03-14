import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ProductsDashboard() {
  const { token } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);
  return (
    <div>
      {products ? (
        <>
          {products.map((product) => {
            return (
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px",
                  alignItems: "center",
                }}
                key={product._id}
              >
                <Card.Img
                  style={{ height: "100px", width: "100px", margin: "5px" }}
                  variant="top"
                  src={product.img}
                />
                <Card.Body>
                  <Card.Title>{product.label}</Card.Title>
                  <Card.Text>
                    <strong>{product.price} JD</strong>{" "}
                  </Card.Text>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "10px",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  {" "}
                  <Button
                    onClick={() => setShow(product._id)}
                    style={{ marginRight: "20px" }}
                    variant="danger"
                  >
                    Delete Product
                  </Button>
                  <Button
                    onClick={(e) => {
                      setShowUpdate(product._id);
                    }}
                    variant="warning"
                  >
                    Update Product
                  </Button>
                </div>
                <Modal show={show === product._id} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <strong>{product.label}</strong>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure that you want to delete this product
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        axios
                          .delete(
                            `http://localhost:5000/product/${product._id}`,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((result) => {
                            setProducts(
                              products.filter((e) => e._id !== product._id)
                            );
                            handleClose();
                          })
                          .catch((error) =>
                            console.log(error.response.data.message)
                          );
                      }}
                    >
                      Delete Product
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/*  */}
                <Modal
                  show={showUpdate === product._id}
                  onHide={handleCloseUpdate}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      id="update-product"
                      onSubmit={(e) => {
                        e.preventDefault();
                        axios
                          .put(
                            `http://localhost:5000/product/${product._id}`,
                            {
                              label: e.target[0].value,
                              brand: e.target[1].value,
                              price: e.target[2].value,
                            },
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            }
                          )
                          .then((result) => {
                            setProducts(
                              products.map((e) => {
                                if (e._id === result.data.product._id) {
                                  return result.data.product;
                                } else {
                                  return e;
                                }
                              })
                            );
                            setShowUpdate(false);
                          })
                          .catch((error) =>
                            console.log(error.response.data.message)
                          );
                      }}
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                          defaultValue={product.label}
                          type="text"
                          placeholder="Product Name"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput2"
                      >
                        <Form.Label>Product brand</Form.Label>
                        <Form.Control
                          defaultValue={product.brand}
                          type="text"
                          placeholder="Product brand"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput3"
                      >
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                          defaultValue={product.price}
                          type="number"
                          placeholder="price"
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                      Close
                    </Button>
                    <Button
                      form="update-product"
                      variant="warning"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
