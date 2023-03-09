import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero";
import About from "../About";

export default function Home() {
  const navigate = useNavigate();
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category`)
      .then((result) => {
        setCategories(result.data.categories);
        localStorage.setItem(
          "categories",
          JSON.stringify(result.data.categories)
        );
        axios
          .get(`http://localhost:5000/product`)
          .then((result) => {
            setProducts(result.data.products);
            localStorage.setItem(
              "products",
              JSON.stringify(result.data.products)
            );
          })
          .catch((error) => console.log(error.response.data.message));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <div>
      <Hero />
      <div>
        <Container>
          <div style={{ margin: "5px" }}>
            <h4
              className="title-name"
              style={{
                fontWeight: "lighter",
                marginTop: "15px",
                paddingTop: "10px",
              }}
            >
              <span>Featured Products</span>
            </h4>
          </div>
          <div className="featured">
            {products
              .filter((e, i) => i < 8)
              .map((product) => {
                return (
                  <Card
                    key={product._id}
                    style={{ width: "18rem", margin: "10px auto" }}
                  >
                    <Card.Img
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                      style={{ height: "18rem", cursor: "pointer" }}
                      variant="top"
                      src={product.img}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "15px" }}>
                        {product.label}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "15px" }}>
                        {product.price} JD
                      </Card.Text>
                      <Button
                        onClick={(e) => {
                          if (!cart.includes(product)) {
                            addToCart(product._id);
                          }
                        }}
                        variant="warning"
                      >
                        Add to cart
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </Container>
      </div>
      <About />
    </div>
  );
}
