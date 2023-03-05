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
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Review added`,
            review: result,
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

module.exports = {
  createNewReview,
};