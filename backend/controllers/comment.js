const commentModel = require("../models/comment");
const productModel = require("../models/product");

const createNewComment = (req, res) => {
  const _id = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      productModel
        .findByIdAndUpdate(
          { _id },
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
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
  createNewComment,
};
