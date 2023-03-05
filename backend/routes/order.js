const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  deleteOrderById,
} = require("../controllers/order");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.get("/user/:id", getOrdersByUser);
orderRouter.post("/", createOrder);
orderRouter.delete("/:id", deleteOrderById);

module.exports = orderRouter;
