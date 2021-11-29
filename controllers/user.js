const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Fail to create an user");
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate("products");
    if (!user) {
      return res.status(401).json("Invalid credentials");
    } else {
      bcrypt.compare(password, user.password, function (error, isMatch) {
        if (error) {
          res.status(401).json(error.message);
          console.log(error.message);
        } else {
          if (isMatch) {
            const accessToken = jwt.sign(
              {
                id: user._id,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            const { password, ...others } = user._doc;

            res.status(200).json({ ...others, token: accessToken });
          } else {
            res.status(500).json("Password not match!");
          }
        }
      });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

// Delete All Users
const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json("All users deleted successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete A User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete a user and associated products");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get An User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("products");
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
    user.products.push(product);
    await product.save();
    await user.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id, pid } = req.params;
  try {
    const result = await User.findByIdAndUpdate(
      id,
      {
        $pull: { products: pid },
      },
      { new: true }
    );
    await Product.findByIdAndDelete(pid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  createProduct,
  deleteProduct,
  deleteUsers,
  deleteUser,
};
