const router = require("express").Router();
const {
  createProduct,
  deleteProducts,
  getProducts,
  getProduct,
  updateProduct,
} = require("../controllers/product");
const { verifyTokenAndAuthorization } = require("./middleware");

// Create Product
router.post("/", createProduct);

// Delete All Products
router.delete("/", deleteProducts);

// Get All Products
router.get("/", getProducts);

// Get An Products
router.get("/:id", verifyTokenAndAuthorization, getProduct);

// Update Product
router.put("/:id", updateProduct);

module.exports = router;
