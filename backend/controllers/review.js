const reviewModel = require("../models/review");
const productModel = require("../models/product");

const createNewReview = (req, res) => {
  const _id = req.params.id;
  const { comment, rate } = req.body;
  const user = req.token.userId;
  const newReview = new reviewModel({
    comment,
    rate,
    user,
  });
  newReview
    .save()
    .then((result) => {
      productModel
        .findByIdAndUpdate(
          { _id },
          { $push: { reviews: result._id } },
          { new: true }
        )
        .then((product) => {
          res.status(201).json({
            success: true,
            message: `Review added`,
            comment: result,
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
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteReviewById = (req, res) => {
  const id = req.params.id;
  const { _id } = req.body._id;
  reviewModel.findByIdAndDelete(id).then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `review was not found`,
      });
    }
    productModel
      .findByIdAndUpdate(_id, { $pull: { reviews: { $in: _id } } })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `review deleted`,
          product: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  });
};

module.exports = {
  createNewReview,
  deleteReviewById,
};
