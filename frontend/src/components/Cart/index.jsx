import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Cart() {
  const {
    token,
    setToken,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    setCart,
    userName,
    setUserName,
    userRole,
    setUserRole,
    userData,
    setUserData,
    products,
    setProducts,
    categories,
    setCategories,
    addToCart,
    removeFromCart,
  } = useContext(UserContext);

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
                  <Button variant="warning">Place order</Button>
                </div>
              </Card>
            </>
          ) : (
            <>
              {" "}
              <div>
                {" "}
                <h1 style={{ margin: "300px" }}>Your Cart is Empty</h1>
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
