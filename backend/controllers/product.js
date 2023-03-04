const productModel = require("../models/product");

//

// create a product
createProduct = (req, res) => {
  const { label, price, brand, img, description, quantity, category } =
    req.body;

  const newProduct = new productModel({
    label,
    price,
    brand,
    img,
    description,
    quantity,
    category,
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
  const userId = req.token.userId;
  productModel
    .find()
    .populate("category")
    .exec()
    .then((products) => {
      if (products.length) {
        res.status(200).json({
          success: true,
          message: `All the products`,
          userId: userId,
          products: products,
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
