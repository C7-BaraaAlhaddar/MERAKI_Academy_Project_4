import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  return (
    <>
      <Container>
        <div>
          {" "}
          <h1 style={{ margin: "300px" }}>Your Cart is Empty</h1>
          <p>
            <Link to={"/"}>return home</Link>
          </p>
        </div>
      </Container>
    </>
  );
}
