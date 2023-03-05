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
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/", getAllUsers);
userRouter.put("/cart/:id", addToCart);
userRouter.put("/cart2/:id", removeFromCart);

//

module.exports = userRouter;
