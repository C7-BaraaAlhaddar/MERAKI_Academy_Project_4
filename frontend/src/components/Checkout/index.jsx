import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Container,
  ListGroup,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
export default function Checkout() {
  const { token, userId, cart, setCart, removeFromCart } =
    useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let total = cart.reduce((acc, e, i) => {
    return (acc += e.price);
  }, 0);
  return (
    <div>
      <Container>
        <Card>
          <Card.Header>
            <strong>checkout</strong>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md">
                <div>
                  <h3>Choose your Payment Method</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  {" "}
                  <Button
                    onClick={(e) => {
                      axios
                        .post(
                          `http://localhost:5000/order`,
                          {
                            user: userId,
                            orders: cart.map((e) => e._id),
                            total: total,
                            paymentMethod: "cash",
                            shipping: false,
                            successfulPayment: false,
                          },
                          { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then(() => {
                          handleShow();
                        })
                        .catch((error) =>
                          console.log(error.response.data.message)
                        );
                    }}
                    variant="warning"
                  >
                    Cash On Delivery
                  </Button>
                  <Button>Pay Online</Button>
                </div>
              </div>
              <div className="col-md">
                {" "}
                <ListGroup>
                  <ListGroup.Item variant="secondary">
                    <strong>Cart</strong>
                  </ListGroup.Item>
                  {cart.map((product) => {
                    return (
                      <ListGroup.Item>
                        {product.label} <strong>{product.price}JD</strong>{" "}
                      </ListGroup.Item>
                    );
                  })}

                  <ListGroup.Item variant="secondary">
                    <strong>Total: {total} JD</strong>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
        <>
          <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>B store</Modal.Title>
            </Modal.Header>
            <Modal.Body>Order sent successfully</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  handleClose();
                  setCart([]);
                  navigate("/");
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
}
