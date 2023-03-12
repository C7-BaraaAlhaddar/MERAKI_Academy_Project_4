import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
export default function Orders() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/order`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setOrders(result.data.orders);
        console.log(result.data.orders);
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);
  return (
    <div>
      {orders.length > 0 ? (
        <>
          {orders.map((order, i) => {
            return (
              <Card key={order._id} style={{ marginBottom: "10px" }}>
                <Card.Header>
                  <Card.Text>{`Order #${i + 1}`}</Card.Text>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <strong>User : </strong>{" "}
                      {`${order.user.firstName} ${order.user.lastName}`}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>
                        Address :{" "}
                      </strong> {`${order.user.address} `}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>
                        Number :{" "}
                      </strong> {`${order.user.phoneNumber} `}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Orders : </strong>{" "}
                      {order.orders.map((order) => {
                        return order.label + " /";
                      })}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Total : </strong> {`${order.total} JD`}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Payment Method : </strong>{" "}
                      {`${order.paymentMethod}`}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {" "}
                      <strong>Delivered : </strong>{" "}
                      {order.shipping ? "Yes" : "Not Yet"}{" "}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    onClick={(e) => {
                      axios
                        .put(
                          `http://localhost:5000/order/${order._id}`,
                          {
                            shipping: true,
                            successfulPayment: true,
                          },
                          { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then((result) => {
                          setOrders(
                            orders.map((e) => {
                              if (e._id === order.id) {
                                return result.data.order;
                              } else {
                                return e;
                              }
                            })
                          );
                        })
                        .catch((error) =>
                          console.log(error.response.data.message)
                        );
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    Mark as delivered
                  </Button>
                  <Button
                    onClick={(e) => {
                      axios
                        .delete(`http://localhost:5000/order/${order._id}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        .then((result) => {
                          setOrders(
                            orders.filter((e) => {
                              return e.id !== order.id;
                            })
                          );
                        })
                        .catch((error) =>
                          console.log(error.response.data.message)
                        );
                    }}
                    variant="danger"
                    style={{ margin: "10px 0 0 10px" }}
                  >
                    Delete order
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <div>No Orders Yet</div>
        </>
      )}
    </div>
  );
}
