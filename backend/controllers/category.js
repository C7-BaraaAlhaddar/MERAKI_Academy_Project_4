const { default: mongoose } = require("mongoose");
const categoryModel = require("../models/category");

//

// create a category
const createCategory = (req, res) => {
  const { categoryName } = req.body;
  const newCat = new categoryModel({ categoryName });
  newCat
    .save()
    .then((category) => {
      res.status(201).json({
        success: true,
        message: `category created`,
        category: category,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: `Server Error`, err: err.message });
    });
};

// update category
const updateCategoryById = (req, res) => {
  const _id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  categoryModel
    .findByIdAndUpdate({ _id }, req.body, { new: true })
    .then((newCategory) => {
      if (!newCategory) {
        return res.status(404).json({
          success: false,
          message: `The Category with id => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Category updated`,
        category: newCategory,
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

module.exports = { createCategory, updateCategoryById };