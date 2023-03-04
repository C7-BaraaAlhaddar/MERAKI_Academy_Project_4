const categoryModel = require("../models/category");

//

// get all categories
const getAllCategories = (req, res) => {
  categoryModel
    .find()
    .populate("products")
    .exec()
    .then((categories) => {
      if (categories.length) {
        res.status(200).json({
          success: true,
          message: `All the categories`,
          categories: categories,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No categories Yet`,
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

// create a category
const createCategory = (req, res) => {
  const { categoryName, img } = req.body;
  const newCat = new categoryModel({ categoryName, img });
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

// delete a category by id

const deleteCategoryById = (req, res) => {
  const id = req.params.id;
  categoryModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Category with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Category deleted`,
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

// get category by id
const getCategoryById = (req, res) => {
  const _id = req.params.id;
  articlesModel
    .findById(_id)
    .populate("products")
    .exec()
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          success: false,
          message: `The category with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The category ${id} `,
        category: category,
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
  createCategory,
  updateCategoryById,
  getAllCategories,
  deleteCategoryById,
  getCategoryById,
};
