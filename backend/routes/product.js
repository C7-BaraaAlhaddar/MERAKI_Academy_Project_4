const express = require("express");
//
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  getProductsByCategory,
  deleteProductById,
} = require("../controllers/product");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//
const productRouter = express.Router();
//
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:id", getProductsByCategory);
productRouter.put(
  "/:id",
  authentication,
  authorization("ADMIN"),
  updateProductById
);
productRouter.delete(
  "/:id",
  authentication,
  authorization("ADMIN"),
  deleteProductById
);
productRouter.post("/", authentication, authorization("ADMIN"), createProduct);
//
module.exports = productRouter;
