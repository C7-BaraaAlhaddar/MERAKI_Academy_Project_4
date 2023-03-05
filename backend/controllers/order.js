const orderModel = require("../models/order");

// create an order
const createOrder = (req, res) => {
  const { orders, total, paymentMethod, shipping, successfulPayment } =
    req.body;
  const user = req.token.userId;
  const newOrder = new orderModel({
    user,
    orders,
    total,
    paymentMethod,
    shipping,
    successfulPayment,
  });

  newOrder
    .save()
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `order created`,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// get all orders function
const getAllOrders = (req, res) => {
  const userId = req.token.userId;
  orderModel
    .find()
    .populate("user", "-password")
    .populate("orders")
    .exec()
    .then((orders) => {
      if (orders.length) {
        res.status(200).json({
          success: true,
          message: `All the orders`,
          userId: userId,
          orders: orders,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No orders Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// getOrderById
const getOrderById = (req, res) => {
  let id = req.params.id;
  orderModel
    .findById(id)
    .populate("user", "-password")
    .populate("orders")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          success: false,
          message: `The order with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The order ${id} `,
        order: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// getOrdersByUser
const getOrdersByUser = (req, res) => {
  let userId = req.params.id;
  orderModel
    .find({ user: userId })
    .populate("user", "-password")
    .populate("orders")
    .exec()
    .then((orders) => {
      if (!orders.length) {
        return res.status(404).json({
          success: false,
          message: `The user: ${userId} has no orders`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the orders for the user: ${userId}`,
        orders: orders,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// delete order by id
const deleteOrderById = (req, res) => {
  const _id = req.params.id;
  orderModel
    .findByIdAndDelete(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The order with id => ${_id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `order deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  deleteOrderById,
};
