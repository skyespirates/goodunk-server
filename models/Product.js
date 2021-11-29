const mongoose = require("mongoose");
const User = require("./User");
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  name: String,
  quantity: Number,
  price: Number,
});

module.exports = model("Product", ProductSchema);
