import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Form,
  FloatingLabel,
  Badge,
} from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { BsFillCartPlusFill } from "react-icons/bs";
export default function Product() {
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(1);
  const { id } = useParams();
  const { cart, addToCart, isLoggedIn, userId, token, userRole } =
    useContext(UserContext);
  const [productData, setProductData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        setProductData(result.data.product);
        setReviews(result.data.product.reviews);
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-md">
            <Card>
              <Card.Img src={productData.img} />
            </Card>
          </div>

          <div style={{ textAlign: "start" }} className="col-md">
            <h2
              style={{
                margin: "10px",
                borderBottom: "1px  solid black",
                paddingBottom: "10px",
              }}
            >
              {productData.label}
            </h2>
            <h2
              style={{
                paddingBottom: "10px",
                margin: "10px",
                fontWeight: "bold",
              }}
            >
              {productData.price} JD
            </h2>
            <ListGroup>
              <ListGroup.Item>
                <strong>Stock</strong> : In stock
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Status</strong> : New
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Brand</strong> : {productData.brand}
              </ListGroup.Item>
            </ListGroup>
            <div>
              <Button
                onClick={(e) => {
                  const included = cart.find((e) => e._id === productData._id);
                  if (!included) {
                    addToCart(productData._id);
                  }
                }}
                style={{ margin: "10px" }}
                variant="warning"
              >
                Add to Cart{" "}
                <BsFillCartPlusFill style={{ marginBottom: "3px" }} />
              </Button>
            </div>
          </div>
          <div style={{ textAlign: "start" }} className="col-md">
            {!productData.specs ? (
              <>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>No specs available</strong>
                  </ListGroup.Item>
                </ListGroup>
              </>
            ) : (
              <>
                {productData.specs.gpu ? (
                  <>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>CPU</strong> : {productData.specs.cpu}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>RAM</strong> : {productData.specs.ram}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>gpu</strong> : {productData.specs.gpu}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <strong>Display</strong> : {productData.specs.monitor}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                ) : (
                  <>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>CPU</strong> : {productData.specs.cpu}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>RAM</strong> : {productData.specs.ram}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Storage</strong> : {productData.specs.memory}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Front camera</strong> :{" "}
                        {productData.specs.frontCamera}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Back camera</strong> :{" "}
                        {productData.specs.backCamera}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Display</strong> : {productData.specs.display}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Battery</strong> : {productData.specs.battery}
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div style={{ margin: "10px", padding: "10px" }}>
          {isLoggedIn ? (
            <div>
              <Card>
                {" "}
                <Card.Header>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5>
                      <strong>Write a review :</strong>
                    </h5>{" "}
                    <div style={{ display: "flex" }}>
                      {" "}
                      <h5>
                        {" "}
                        <Badge bg="secondary">
                          <strong style={{}}>Rate </strong>
                        </Badge>
                      </h5>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      axios
                        .put(
                          `http://localhost:5000/product/review/${id}`,
                          {
                            rate: value,
                            comment: e.target[0].value,
                            user: userId,
                          },
                          { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then((result) => {
                          console.log(result.data);
                          setReviews([...reviews, result.data.comment]);
                          e.target[0].value = "";
                        })
                        .catch((error) =>
                          console.log(error.response.data.message)
                        );
                    }}
                  >
                    {" "}
                    <FloatingLabel controlId="floatingTextarea2" label="Review">
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        margin: "10px 0 0 0",
                      }}
                    >
                      <Button variant="warning" type="submit">
                        Submit review
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <></>
          )}
        </div>
        {reviews.length > 0 ? (
          <>
            <div style={{ margin: "5px" }}>
              <h4
                className="title-name"
                style={{ fontWeight: "lighter", marginTop: "15px" }}
              >
                <span>Reviews</span>
              </h4>
            </div>
            <div>
              {reviews.map((review) => {
                return (
                  <Card style={{ margin: "10px" }} key={review._id}>
                    <Card.Header
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <strong>{`${review.user.firstName} ${review.user.lastName}`}</strong>
                      </div>
                      <Rating name="read-only" value={review.rate} readOnly />
                    </Card.Header>
                    <Card.Body>{review.comment}</Card.Body>
                    <Card.Footer
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      {(userRole === "admin" || review.user._id === userId) && (
                        <Button
                          onClick={(e) => {
                            axios
                              .put(
                                `http://localhost:5000/product/review2/${review._id}`,
                                {
                                  _id: productData._id,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then((result) => {
                                setReviews(
                                  reviews.filter((e) => e._id !== review._id)
                                );
                              })
                              .catch((error) =>
                                console.log(error.response.data.message)
                              );
                          }}
                          variant="danger"
                        >
                          Delete review
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                );
              })}
            </div>{" "}
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
