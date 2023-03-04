const express = require("express");

//
const {
  createCategory,
  updateCategoryById,
  getAllCategories,
  deleteCategoryById,
  getCategoryById,
} = require("../controllers/category");
//
const categoryRouter = express.Router();
//
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", deleteCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategoryById);

//

module.exports = categoryRouter;
