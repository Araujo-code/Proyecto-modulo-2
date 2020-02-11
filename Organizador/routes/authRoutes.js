const {
  Router
} = require("express");
const passport = require("../config/passport");
const router = Router();
const {
  signupView,
  signup,
  loginView,
  logout
} = require("../controllers/authControllers.js");

router.get("/signup", signupView);

router.post("/signup", signup);

router.get("/login", loginView);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    failureMessage: "The input data is incorrect"
  })
);
// Facebook auth Routes
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);


// Google auth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login"
  })
);

router.get("/logout", logout);

module.exports = router;