const router = require("express").Router();
const {
  createProduct,
  deleteProducts,
  getProducts,
  getProduct,
  updateProduct,
} = require("../controllers/product");

// Create Product
router.post("/", createProduct);

// Delete All Products
router.delete("/", deleteProducts);

// Get All Products
router.get("/", getProducts);

// Get An Products
router.get("/:id", getProduct);

// Update Product
router.put("/:id", updateProduct);

module.exports = router;
