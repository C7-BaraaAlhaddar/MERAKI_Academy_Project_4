import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Alert,
  Card,
  Stack,
  Navbar,
} from "react-bootstrap";
import { UserContext } from "../UserContext";

export default function UserProfile() {
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
  //   const [userUpdated, setUserUpdated] = useState(0);
  return (
    <Container>
      {" "}
      <Card>
        <Card.Body>
          <Navbar style={{ marginBottom: "10px" }} variant="dark" bg="dark">
            <Container>
              <Navbar.Brand className="m-auto">Profile</Navbar.Brand>
            </Container>
          </Navbar>

          <div className="profile">
            <div className="profile-headers">
              {" "}
              <Stack gap={3}>
                <div className="bg-light border">First Name</div>
                <div className="bg-light border">Last Name</div>
                <div className="bg-light border">Age</div>
                <div className="bg-light border">Address</div>
                <div className="bg-light border">Email</div>
                <div className="bg-light border">Phone Number</div>
              </Stack>
            </div>
            <div className="profile-data">
              {" "}
              <Stack gap={3}>
                <div className="bg-light border">{userData.firstName}</div>
                <div className="bg-light border">{userData.lastName}</div>
                <div className="bg-light border">{userData.age}</div>
                <div className="bg-light border">{userData.address}</div>
                <div className="bg-light border">{userData.email}</div>
                <div className="bg-light border">{userData.phoneNumber}</div>
              </Stack>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
