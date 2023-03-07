import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import jwt_decode from "jwt-decode";

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
  const [userData, setUserData] = useState(null);

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
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
