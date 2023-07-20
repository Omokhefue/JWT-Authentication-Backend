const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // sign up values do not match with specified parameters standard
  if (err.name === "ValidationError") {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  // registering duplicate email
  if (err.code === 11000) {
    errors["email"] = "that email is already registered";
  }
  // login email does not exist
  if (err.message === "incorrect email") {
    errors["email"] = "check your login details";
  }
  // login password is not correct
  if (err.message === "incorrect password") {
    errors["password"] = "check your login details";
  }

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
getHomepage = (req, res) => {
  res.status(200).json({ success: true, msg: "Home Page!" });
};
getSignup = (req, res) => {
  res.status(200).json({ success: true, msg: "this is the sign Up page!" });
};
getLogin = (req, res) => {
  res.status(200).json({ success: true, msg: "this is the LogIn page!" });
};
postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/");
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({
      success: false,
      error,
    });
  }
};
postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/");
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json({ success: false, err });
  }
};
getLogout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
};

module.exports = {
  getHomepage,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getLogout,
};
