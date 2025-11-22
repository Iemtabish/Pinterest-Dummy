var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");

const localStrategy = require("passport-local");
const passport = require("passport");
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//REGISTER FORM
router.post("/register", async function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  await userModel.register(userData, req.body.password);

  passport.authenticate("local")(req, res, function () {
    res.redirect("/profile");
  });
});


//LOGIN FORM
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

module.exports = router;
