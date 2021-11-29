const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const Product = require("./Product");

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
UserSchema.post("findOneAndDelete", async function (user) {
  if (user.products.length) {
    const res = await Product.deleteMany({ _id: { $in: user.products } });
    console.log(res);
  }
});
module.exports = model("User", UserSchema);
