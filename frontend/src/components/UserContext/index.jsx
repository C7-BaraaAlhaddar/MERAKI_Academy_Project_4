import React, { createContext, useState } from "react";
import axios from "axios";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userData, setUserData] = useState(localStorage.getItem("userData"));
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) ?? []
  );
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) ?? []
  );
  const addToCart = (id) => {
    if (isLoggedIn) {
      axios
        .put(
          `http://localhost:5000/user/cart/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          setCart(result.data.cart);
          localStorage.setItem("cart", JSON.stringify(result.data.cart));
          console.log(cart);
        })
        .catch((error) => console.log(error.response.message.data));
    }
  };
  const removeFromCart = (id) => {
    if (isLoggedIn) {
      axios
        .put(
          `http://localhost:5000/user/cart2/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          setCart(result.data.cart);
          localStorage.setItem("cart", JSON.stringify(result.data.cart));
        })
        .catch((error) => console.log(error.response.message.data));
    }
  };

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
