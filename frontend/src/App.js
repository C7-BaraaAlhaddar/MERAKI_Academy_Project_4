import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
