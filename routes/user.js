const router = require("express").Router();
const {
  getUsers,
  getUser,
  createProduct,
  deleteUsers,
} = require("../controllers/user");
const { verifyTokenAndAuthorization } = require("./middleware");

// Get All Users
router.get("/", getUsers);

// Get An User
router.get("/:id", getUser);

// Create A Product
router.post("/:id", verifyTokenAndAuthorization, createProduct);

// Delete All Users
router.delete("/", deleteUsers);

module.exports = router;
