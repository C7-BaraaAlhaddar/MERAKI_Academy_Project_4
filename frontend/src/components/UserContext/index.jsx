import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={{}}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
