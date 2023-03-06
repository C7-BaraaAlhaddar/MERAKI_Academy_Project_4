import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
