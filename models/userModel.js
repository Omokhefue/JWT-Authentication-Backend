const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "password should be at lest 6 characters long"],
  },
});

userSchema.pre("save", async function () {
  let password = await bcrypt.hash(this.password, 10);
  this.password = password;
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("incorrect email");
  }
  const auth = await bcrypt.compare(password, user.password);
  if (auth) {
    return user;
  } else {
    throw new Error("incorrect password");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
