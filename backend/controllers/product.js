const productModel = require("../models/product");
const reviewModel = require("../models/review");
const userModel = require("../models/user");
//

// create a product
const createProduct = (req, res) => {
  const { label, price, brand, img, description, category, specs } = req.body;

  const newProduct = new productModel({
    label,
    price,
    brand,
    img,
    description,
    category,
    specs,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: `product created`,
        product: product,
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
// get all products
const getAllProducts = (req, res) => {
  let from = req.query.from;

  productModel
    .find()
    .skip(from ?? 0)
    .limit(8)
    .populate("category")
    .populate("reviews")
    .exec()
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          products: products,
          length: products.length,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No products Yet`,
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
// admin get all products
const adminGetAllProducts = (req, res) => {
  productModel
    .find()
    .populate("category")
    .populate("reviews")
    .exec()
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          products: products,
          length: products.length,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No products Yet`,
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

// get product by id
const getProductById = (req, res) => {
  let id = req.params.id;
  productModel
    .findById(id)
    .populate("category")
    .populate({
      path: "reviews",
      model: reviewModel,
      populate: {
        path: "user",
        model: userModel,
        select: "firstName lastName _id",
      },
    })
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${id} not found`,
        });
      }

      res.status(200).json({
        success: true,
        message: `The product ${id} `,
        product: product,
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

// searchProducts
const searchProducts = (req, res) => {
  const name = req.params.name;
  productModel
    .find({ label: { $regex: `${name}`, $options: "i" } })
    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `no results`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Search results for: ${name}`,
        products: products,
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

// update a product by id
const updateProductById = (req, res) => {
  const _id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  productModel
    .findByIdAndUpdate({ _id }, req.body, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `product updated`,
        product: updatedProduct,
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

// getProductsByCategory
const getProductsByCategory = (req, res) => {
  let category = req.params.id;
  let from = req.query.from;

  productModel
    .find({ category })
    .skip(from ?? 0)
    .limit(8)
    .populate("category")
    .populate("reviews")
    .exec()
    .then((products) => {
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `The category: ${category} has no products`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the products for the category: ${category}`,
        products: products,
        categoryName: products[0].category.categoryName,
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

// delete a product by id
const deleteProductById = (req, res) => {
  const _id = req.params.id;
  productModel
    .findByIdAndDelete(_id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${_id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `product deleted`,
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
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  getProductsByCategory,
  deleteProductById,
  searchProducts,
  adminGetAllProducts,
};
