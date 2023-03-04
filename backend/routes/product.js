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
//
const productRouter = express.Router();
//
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:id", getProductsByCategory);
productRouter.put("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);
productRouter.post("/", createProduct);
//
module.exports = productRouter;
