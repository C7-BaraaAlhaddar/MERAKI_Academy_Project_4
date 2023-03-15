const reviewModel = require("../models/review");
const productModel = require("../models/product");
const userModel = require("../models/user");
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
      reviewModel
        .findById(result._id)
        .populate("user", "firstName lastName _id")
        .then((comment) => {
          productModel
            .findByIdAndUpdate(
              { _id },
              { $push: { reviews: result._id } },
              { new: true }
            )
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
              res.status(201).json({
                success: true,
                message: `Review added`,
                comment: comment,
                product: product,
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
  const { _id } = req.body;
  reviewModel.findByIdAndDelete(id).then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `review was not found`,
      });
    }
    productModel
      .findByIdAndUpdate(_id, { $pull: { reviews: { $in: id } } })
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
