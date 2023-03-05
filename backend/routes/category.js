const express = require("express");

//
const {
  createCategory,
  updateCategoryById,
  getAllCategories,
  deleteCategoryById,
  getCategoryById,
} = require("../controllers/category");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
//
const categoryRouter = express.Router();
//
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete(
  "/:id",
  authentication,
  authorization("ADMIN"),
  deleteCategoryById
);
categoryRouter.post(
  "/",
  authentication,
  authorization("ADMIN"),
  createCategory
);
categoryRouter.put(
  "/:id",
  authentication,
  authorization("ADMIN"),
  updateCategoryById
);

//

module.exports = categoryRouter;
