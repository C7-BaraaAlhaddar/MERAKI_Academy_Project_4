import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Cart() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { token, userId, cart, setCart, removeFromCart } =
    useContext(UserContext);

  let total = cart.reduce((acc, e, i) => {
    return acc + e.price;
  }, 0);
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
                    onClick={(e) => navigate("/checkout")}
                    variant="warning"
                  >
                    Proceed to checkout
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
