const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.DB_URI || "mongodb://localhost:27017/relationship")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Serving on port " + PORT);
});
