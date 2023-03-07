const express = require("express");
const {
  register,
  login,
  updateUserById,
  deleteUserById,
  getAllUsers,
  addToCart,
  removeFromCart,
  getUserById,
} = require("../controllers/user");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//

const userRouter = express.Router();

//

userRouter.post("/register", register);

userRouter.post("/login", login);
userRouter.put("/:id", authentication, authorization("USER"), updateUserById);
userRouter.delete(
  "/:id",
  authentication,
  authorization("USER"),
  deleteUserById
);
userRouter.get("/", authentication, authorization("ADMIN"), getAllUsers);
userRouter.get("/userData", authentication, authorization("USER"), getUserById);

userRouter.put("/cart/:id", authentication, addToCart);
userRouter.put("/cart2/:id", authentication, removeFromCart);

//

module.exports = userRouter;
