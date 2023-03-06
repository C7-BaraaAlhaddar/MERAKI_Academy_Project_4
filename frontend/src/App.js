import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
export const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value={""}>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <h1>Project 4 </h1>
          <Register />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
