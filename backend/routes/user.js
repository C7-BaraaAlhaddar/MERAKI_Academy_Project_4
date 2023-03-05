const express = require("express");
const {
  register,
  login,
  updateUserById,
  deleteUserById,
  getAllUsers,
  addToCart,
  removeFromCart,
} = require("../controllers/user");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//

const userRouter = express.Router();

//

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/:id", authentication, authorization("ADMIN"), updateUserById);
userRouter.delete(
  "/:id",
  authentication,
  authorization("ADMIN"),
  deleteUserById
);
userRouter.get("/", authentication, authorization("ADMIN"), getAllUsers);
userRouter.put("/cart/:id", authentication, addToCart);
userRouter.put("/cart2/:id", authentication, removeFromCart);

//

module.exports = userRouter;
