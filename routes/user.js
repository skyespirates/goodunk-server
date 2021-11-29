const router = require("express").Router();
const {
  getUsers,
  getUser,
  createProduct,
  deleteProduct,
  deleteUsers,
  deleteUser,
} = require("../controllers/user");

// Get All Users
router.get("/", getUsers);

// Get An User
router.get("/:id", getUser);

// Create A Product
router.post("/:id/product", createProduct);

// Delete A Product
router.delete("/:id/product/:pid", deleteProduct);

// Delete All Users
router.delete("/", deleteUsers);

// Delete A User
router.delete("/:id", deleteUser);

module.exports = router;
