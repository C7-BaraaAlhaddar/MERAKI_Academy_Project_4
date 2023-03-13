import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Cart() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const {
    token,
    setToken,
    userId,
    setUserId,
    cart,
    setCart,
    addToCart,
    removeFromCart,
  } = useContext(UserContext);

  let total = cart.reduce((acc, e, i) => {
    return acc + e.price;
  }, 0);
  console.log(total);
  return (
    <>
      <Container>
        <div>
          {cart.length > 0 ? (
            <>
              {cart.map((product) => {
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
                        onClick={(e) => {
                          removeFromCart(product._id);
                        }}
                        style={{ marginRight: "20px" }}
                        variant="danger"
                      >
                        Remove from cart
                      </Button>
                    </div>
                  </Card>
                );
              })}

              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div>
                  {" "}
                  <Card.Title>
                    <strong>Total : {total} JD</strong>{" "}
                  </Card.Title>
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
                    Place order
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <>
              {" "}
              <div>
                {" "}
                <h1 style={{ margin: "300px 0 300px 0" }}>
                  Your Cart is Empty
                </h1>
                <p>
                  <Link to={"/"}>return home</Link>
                </p>
              </div>
            </>
          )}
        </div>
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
    </>
  );
}

{
  /* <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          const name = details.payer.name.given_name;
                          console.log(details);
                        });
                      }}
                      style={{ layout: "horizontal" }}
                    />
                  </PayPalScriptProvider> */
}
