const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// Load User Model
const User = require("../../models/User");

// Get Config Screte Key
const config = require("../../config/keys");

// Load Validations Files
const validateRegisterInput = require("../../validators/register");
const validatoeLoginInput = require("../../validators/login");

/* @route  GET api/users/test
/* @desc   Test user route
/* @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "User work" }));

/* @route  POST api/users/register
/* @desc   Register New User
/* @access Public
*/
router.post("/register", (req, res) => {
  /* const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validations
  if (!isValid) {
    console.log("errors findout");
    return res.status(400).json(errors);
  } */
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email Already Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm" //Default Avatar
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw console.log("error");
          } else {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log("error occurd"));
          } //End if
        });
      });
    } //End if-else
  });
});

/* @route  POST api/users/register
/* @desc   Register New User
/* @access Public
*/
router.post("/login", (req, res) => {
  /* const { errors, isValid } = validatoeLoginInput(req.body);

  //Check Validations
  if (!isValid) {
    console.log("errors findout");
    return res.status(400).json(errors);
  } */

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    //Check User
    if (!user) {
      //errors.email = "User Not Found";
      return res.status(404).json({ email: "User Not found" });
    } //End if

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Token
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        //errors.password = "Password Incorrect";
        return res.status(400).json({ password: "Password Incorrect" });
      } //End if-else
    });
  });
});

/* @route  GET api/users/current
/* @desc   Get Autharization User
/* @access Private
*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
