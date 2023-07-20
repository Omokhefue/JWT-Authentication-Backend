const {
  getSignup,
  getLogin,
  postLogin,
  postSignup,
  getHomepage,
  getLogout
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const { Router } = require("express");
const router = Router();

router.get("/",authMiddleware, getHomepage);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/signup", postSignup);
router.get("/logout", getLogout);

module.exports = router;
