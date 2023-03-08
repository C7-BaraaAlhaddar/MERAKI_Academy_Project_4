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
  } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category`)
      .then((result) => {
        setCategories(result.data.categories);
        axios
          .get(`http://localhost:5000/product`)
          .then((result) => {
            setProducts(result.data.products);
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
            <h4 style={{ fontWeight: "lighter", marginTop: "15px" }}>
              New in stock
            </h4>
          </div>
          <div className="featured">
            {products
              .filter((e, i) => i < 8)
              .map((product) => {
                return (
                  <>
                    <Card style={{ width: "18rem", margin: "10px auto" }}>
                      <Card.Img
                        style={{ height: "18rem" }}
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
                        <Button variant="warning">Add to cart</Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
          </div>
        </Container>
      </div>
      <About />
    </div>
  );
}

// console.log();
