import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Product from "./components/Product";
import NotFound from "./components/NotFound";
import ProductsPage from "./components/ProductsPage";
import CategoryPage from "./components/CategoryPage";
function App() {
  return (
    <>
      <NavbarMenu />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route
          path="/product/:id"
          element={
            <>
              <Product /> <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <ProductsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/category/:id"
          element={
            <>
              <CategoryPage />
              <Footer />
            </>
          }
        />

        {/* Handling Undefined Routes */}
        <Route
          path="*"
          element={
            <>
              <NotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
