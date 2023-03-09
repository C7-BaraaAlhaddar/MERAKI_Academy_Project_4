import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Container, Card, Button } from "react-bootstrap";

export default function ProductsPage() {
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

  return (
    <>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4
            className="title-name"
            style={{ fontWeight: "lighter", marginTop: "15px" }}
          >
            <span>All Products</span>
          </h4>
        </div>
        <div className="products-box">
          {products.map((product) => {
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
                      if (!isLoggedIn) {
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
    </>
  );
}
