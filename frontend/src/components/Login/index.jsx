import React, { useState, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { UserContext } from "../UserContext";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
export default function Login() {
  const navigate = useNavigate();
  const googleLoginSuccess = (data) => {
    console.log(jwt_decode(data.credential));
    const { email, given_name, family_name } = jwt_decode(data.credential);
  };
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const {
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
  } = useContext(UserContext);
  const loginFunc = (e) => {
    e.preventDefault();
    console.log(loginErrorMsg);
    if (e.target[0].value == "" || e.target[1].value == "") {
      return setLoginErrorMsg("All fields are required");
    } else if (!validator.isEmail(e.target[0].value)) {
      return setLoginErrorMsg("Your Email is incorrect");
    }
    axios
      .post("http://localhost:5000/user/login", {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("cart", JSON.stringify(data.cart));
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userName", data.firstName);
        setToken(data.token);
        setCart(data.cart);
        setUserId(data.userId);
        setUserName(data.firstName);
        setUserRole(data.role);
        setLoginErrorMsg(null);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        setLoginErrorMsg(error.response.data.message);
      });
  };
  return (
    <div className="login">
      <Container>
        <Card style={{ padding: "10px" }}>
          {" "}
          <Container
            style={{
              padding: "10px 50px",
              marginBottom: "10px",
            }}
          >
            <Card.Title style={{ fontSize: "50px" }}>Sign In</Card.Title>
          </Container>
          <Form onSubmit={loginFunc}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {loginErrorMsg && <Alert variant="danger">{loginErrorMsg}</Alert>}
            <Button variant="warning" type="submit">
              Sign In
            </Button>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <GoogleLogin
                onSuccess={googleLoginSuccess}
                onError={(errorMessage) => {
                  console.log(errorMessage);
                }}
              />
            </div>
            <Card.Text
              style={{ fontSize: "15px", padding: "5px", margin: "5px" }}
            >
              Don't have an account ? <Link to="/register">Register</Link>
            </Card.Text>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
