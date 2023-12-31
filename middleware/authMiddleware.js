const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.redirect("/login");
    } else {
      next();
    }
  });
};

module.exports = requireAuth;
