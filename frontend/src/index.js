import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { UserContextProvider } from "./components/UserContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="1050103270020-bba0cn8jn4nf9rlj25i63lmm3j24g36n.apps.googleusercontent.com">
    <React.StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
