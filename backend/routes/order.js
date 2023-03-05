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

orderRouter.get("/", authentication, authorization("ADMIN"), getAllOrders);
orderRouter.get("/:id", authentication, authorization("ADMIN"), getOrderById);
orderRouter.get(
  "/user/:id",
  authentication,
  authorization("ADMIN"),
  getOrdersByUser
);
orderRouter.post("/", authentication, createOrder);
orderRouter.delete(
  "/:id",
  authentication,
  authorization("ADMIN"),
  deleteOrderById
);

module.exports = orderRouter;
