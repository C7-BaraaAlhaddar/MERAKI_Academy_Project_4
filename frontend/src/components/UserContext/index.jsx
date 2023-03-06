import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [cart, setCart] = useState(localStorage.getItem("cart"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    // the Provider gives access to the context to its children
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
