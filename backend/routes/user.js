const express = require("express");
const {
  register,
  login,
  updateUserById,
  deleteUserById,
  getAllUsers,
} = require("../controllers/user");

//

const userRouter = express.Router();

//

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.get("/", getAllUsers);

//

module.exports = userRouter;
