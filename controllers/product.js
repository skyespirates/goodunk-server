const Product = require("../models/Product");

// Create Product
const createProduct = async (req, res) => {
  try {
    const insertProducts = await Product.insertMany(products);
    res.status(200).json(insertProducts);
  } catch (error) {
    res.status(500).json("Fail to create an user");
  }
};

// Delete All Products
const deleteProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.status(200).json("Deleted all products");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete A Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted a product");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get An Product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  createProduct,
  deleteProducts,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
};
