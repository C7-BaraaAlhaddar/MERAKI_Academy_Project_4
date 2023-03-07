import React, { useState, useContext } from "react";
import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NavbarMenu() {
  const navigate = useNavigate();

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
    userData,
    setUserData,
  } = useContext(UserContext);

  const logOutFunc = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setUserName(null);
    setCart([]);
    setUserRole(null);
    setUserData(null);
    localStorage.clear();
    navigate("/");
  };
  const accountFunc = () => {
    axios
      .get("http://localhost:5000/user/userData", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setUserData(result.data.user);
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate(`/profile/${userId}`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Navbar bg="warning" className="py-2 fixed-top" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            navigate("/");
          }}
        >
          B Store
        </Navbar.Brand>

        <Navbar.Toggle className="my-2" aria-controls="nav-menu" />

        <Navbar.Collapse id="nav-menu">
          <Nav className="ms-auto">
            <InputGroup className="mb-auto">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <BsSearch style={{ marginBottom: "2px" }} />
              </Button>
            </InputGroup>
            <NavDropdown
              title={isLoggedIn ? `${userName}` : "Account"}
              id="basic-nav-dropdown"
            >
              {isLoggedIn ? (
                <>
                  {" "}
                  <NavDropdown.Item onClick={accountFunc}>
                    Account
                  </NavDropdown.Item>
                  {userRole === "admin" && (
                    <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOutFunc}>
                    Sign out
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Sign In
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <Nav.Link href="#link">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
