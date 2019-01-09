const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load User Profile
const User = require("../../models/User");

//@route  GET api/profile/test
//@desc   Test profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile work" }));

//@route  GET api/profile/
//@desc   Get Current User Profile
//@access Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(isProfile => {
        if (!isProfile) {
          errors.noprofile = "Profile not fount for this user";
          return res.status(404).json(errors);
        }

        res.json(isProfile);
      })
      .catch(er => res.status(404).json(err));
  }
);

/*
  @route  GET api/profile/
  @desc   Create User Profile
  @access Private
*/
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let profilefields = {};

    profilefields.user = req.user.id;
    if (req.body.handle) profilefields.handle = req.body.handle;
    if (req.body.company) profilefields.company = req.body.company;
    if (req.body.website) profilefields.website = req.body.website;
    if (req.body.location) profilefields.location = req.body.location;
    if (req.body.bio) profilefields.bio = req.body.bio;
    if (req.body.status) profilefields.status = req.body.status;
    if (req.body.githubusername)
      profilefields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined") {
      profilefields.skills = req.body.skills.split(",");
    }

    //Social
    profilefields.social = {};
    if (req.body.youtub) profilefields.social.youtub = req.body.youtub;
    if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

    //if (req.body.handle) profilefields.handle = req.body.handle;
  }
);
module.exports = router;
