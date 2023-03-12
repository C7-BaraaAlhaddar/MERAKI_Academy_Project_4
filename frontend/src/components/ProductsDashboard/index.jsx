import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function ProductsDashboard() {
  const { token } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
                <div>
                  {" "}
                  <Button
                    onClick={() => setShow(product._id)}
                    style={{ marginRight: "20px" }}
                    variant="danger"
                  >
                    Delete Product
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
                      Delete User
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
