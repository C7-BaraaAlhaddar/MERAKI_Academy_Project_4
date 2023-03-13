import React, { useState, useContext, useEffect } from "react";

import { useNavigate, Route, Routes, useParams } from "react-router-dom";
import { Button, Container, Card, ListGroup } from "react-bootstrap";
import { UserContext } from "../UserContext";
import UserInfo from "../UserInfo";
import UpdateUser from "../UserUpdate";
import UserUpdatePassword from "../UserUpdatePassword";

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
  const { id } = useParams();

  return (
    <Container>
      <div className="row">
        <div style={{ marginBottom: "10px" }} className="col-md-3">
          {" "}
          <Card>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item
                  onClick={(e) => navigate(`/profile/${id}`)}
                  className="list-filter"
                >
                  <strong>User Information</strong>
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={(e) => navigate(`/profile/${id}/update`)}
                  className="list-filter"
                >
                  <strong>Update Information</strong>
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={(e) => navigate(`/profile/${id}/password`)}
                  className="list-filter"
                >
                  <strong> Change Password</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md">
          <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="/update" element={<UpdateUser />} />
            <Route path="/password" element={<UserUpdatePassword />} />
          </Routes>
        </div>
      </div>
    </Container>
  );
}

// {" "}
// <Card>
//   <Card.Header>
//     <strong>{`${userData.firstName} ${userData.lastName}`}</strong>
//   </Card.Header>
//   <Card.Body>
//     <div className="profile">
//       <div className="profile-headers">
//         {" "}
//         <Stack gap={3}>
//           <div className="bg-light border profile-field">First Name</div>
//           <div className="bg-light border profile-field">Last Name</div>
//           <div className="bg-light border profile-field">Age</div>
//           <div className="bg-light border profile-field">Address</div>
//           <div className="bg-light border profile-field">Email</div>
//           <div className="bg-light border profile-field">
//             Phone Number
//           </div>
//         </Stack>
//       </div>
//       <div className="profile-data">
//         {" "}
//         <Stack gap={3}>
//           <div className="bg-light border profile-field">
//             {userData.firstName}
//           </div>
//           <div className="bg-light border profile-field">
//             {userData.lastName}
//           </div>
//           <div className="bg-light border profile-field">
//             {userData.age}
//           </div>
//           <div className="bg-light border profile-field">
//             {userData.address}
//           </div>
//           <div className="bg-light border profile-field">
//             {userData.email}
//           </div>
//           <div className="bg-light border profile-field">
//             {userData.phoneNumber}
//           </div>
//         </Stack>
//       </div>
//     </div>
//     <div
//       style={{
//         marginTop: "15px",
//         display: "flex",
//         flexDirection: "row-reverse",
//       }}
//     >
//       <Button
//         onClick={() => setEditProfile(!editProfile)}
//         variant="warning"
//       >
//         Edit profile
//       </Button>
//       <Button
//         onClick={handleShow}
//         variant="danger"
//         style={{ marginRight: "10px" }}
//       >
//         Delete Account
//       </Button>
//     </div>
//     <Collapse in={editProfile}>

//     </Collapse>
//   </Card.Body>
// </Card>
