import "./App.css";
import React from "react";
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
import Cart from "./components/Cart";
import SearchPage from "./components/SearchPage";
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";
import "mapbox-gl/dist/mapbox-gl.css";

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
        <Route
          path="/register"
          element={
            <>
              <Register /> <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login /> <Footer />
            </>
          }
        />
        <Route
          path="/profile/:id/*"
          element={
            <>
              <UserProfile /> <Footer />{" "}
            </>
          }
        />
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
          path="/search/:name"
          element={
            <>
              <SearchPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <>
              <Dashboard />

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
        <Route
          path="/cart"
          element={
            <>
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Checkout />
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
