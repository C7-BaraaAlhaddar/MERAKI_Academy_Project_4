import React, { useState, useContext } from "react";
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
  } = useContext(UserContext);
  return (
    <div>
      <Hero />
      <About />
    </div>
  );
}
