const router = require("express").Router();
const {
  createProduct,
  deleteProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// Create Product
router.post("/", createProduct);

// Delete All Products
router.delete("/", deleteProducts);

// Delete A Product
router.delete("/:id", deleteProduct);

// Get All Products
router.get("/", getProducts);

// Get An Products
router.get("/:id", getProduct);

// Update Product
router.put("/:id", updateProduct);

module.exports = router;
