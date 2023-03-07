import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
