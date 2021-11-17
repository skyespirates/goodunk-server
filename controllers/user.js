const User = require("../models/User");
const Product = require("../models/Product");
// Create User
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Fail to create an user");
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("products");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get An User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Create A Product
const createProduct = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const product = new Product(req.body);
    await product.save();
    user.products.push(product);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = { createUser, getUsers, getUser, createProduct };
