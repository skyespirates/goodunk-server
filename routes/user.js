const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  createProduct,
} = require("../controllers/user");

// Create User
router.post("/", createUser);

// Get All Users
router.get("/", getUsers);

// Get An User
router.get("/:id", getUser);

// Create A Product
router.post("/:id", createProduct);
module.exports = router;
