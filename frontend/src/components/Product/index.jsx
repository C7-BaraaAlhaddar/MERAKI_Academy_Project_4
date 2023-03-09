import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Button, ListGroup, Table } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "../Hero";
import About from "../About";

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [productData, setProductData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        setProductData(result.data.product);
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
                  if (cart.includes(productData)) {
                    addToCart(productData._id);
                  }
                }}
                style={{ margin: "10px" }}
                variant="warning"
              >
                Add to Cart
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
      </Container>
    </>
  );
}
