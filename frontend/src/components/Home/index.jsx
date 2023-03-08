import React, { useState, useContext, useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
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
    Products,
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
      <About />
    </div>
  );
}
