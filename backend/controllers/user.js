const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const role = require("../models/role");

// register function
const register = (req, res) => {
  const {
    firstName,
    lastName,
    age,
    address,
    email,
    password,
    role,
    phoneNumber,
  } = req.body;
  const user = new userModel({
    firstName,
    lastName,
    age,
    address,
    phoneNumber,
    email,
    password,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// login function
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .populate("cart")
    .exec()
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          role: result.role,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          userId: result._id,
          firstName: result.firstName,
          cart: result.cart,
          role: result.role.role,
        });
      } catch (error) {
        throw new Error(error.message);
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

// update a user by id
const updateUserById = (req, res) => {
  const _id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  userModel
    .findByIdAndUpdate({ _id }, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: `The User with id => ${_id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `User updated`,
        user: updatedUser,
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

// delete a user by id
const deleteUserById = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User deleted`,
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
// get All users

const getAllUsers = (req, res) => {
  userModel
    .find({}, "-password")
    .populate("cart")
    .exec()
    .then((users) => {
      if (users.length) {
        res.status(200).json({
          success: true,
          message: `All the users`,
          users: users,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No users Yet`,
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

// get a user by id
const getUserById = (req, res) => {
  const _id = req.token.userId;
  userModel
    .findById({ _id }, "-password")
    .populate("cart")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${userId} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User Data`,
        user: result,
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

// add to cart
const addToCart = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  userModel
    .findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: productId } },
      { new: true }
    )
    .populate("cart")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${userId} not found`,
        });
      }
      res.status(201).json({
        success: true,
        message: `added to cart`,
        cart: result.cart,
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
// remove from cart
const removeFromCart = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  userModel
    .findByIdAndUpdate(
      { _id: userId },
      { $pull: { cart: { $in: productId } } },
      { new: true }
    )
    .populate("cart")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${userId} not found`,
        });
      }
      res.status(201).json({
        success: true,
        message: `removed from cart`,
        cart: result.cart,
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

// getUsersCart

module.exports = {
  register,
  login,
  updateUserById,
  deleteUserById,
  getAllUsers,
  addToCart,
  removeFromCart,
  getUserById,
};
