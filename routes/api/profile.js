const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load Profile Model
const Profile = require("../../models/Profile");
//Load User Profile
const User = require("../../models/User");
//Load Validation File
const validatoeProfileInput = require("../../validators/profile");

//@route  GET api/profile/test
//@desc   Test profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile work" }));

//@route  GET api/profile/handle/:handle
//@desc   Get handle profile
//@access Public
router.get("/handle/:handle", (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        res.status(400).json(errors);
      } else {
        res.json(profile);
      } //End if
    });
});

//@route  GET api/profile/user/:user_id
//@desc   Get User profile
//@access Public
router.get("/user/:user_id", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        res.status(400).json(errors);
      } //End if

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/all
//@desc   Get All profiles
//@access Public
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There is no profiles";
        res.status(400).json(errors);
      } else {
        res.json(profiles);
      } //End if-else
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/
//@desc   Get Current User Profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(isProfile => {
        if (!isProfile) {
          errors.noprofile = "Profile not fount for this user";
          return res.status(404).json(errors);
        } //End if

        res.json(isProfile);
      })
      .catch(er => res.status(404).json(err));
  }
);

/*
  @route  POST api/profile/
  @desc   Create User Profile
  @access Private
*/
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    /* const { errors, isValid } = validatoeProfileInput(req.body);

    //Check Validations
    if (!isValid) {
      console.log("errors findout");
      return res.status(400).json(errors);
    } */

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
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profilefields.social.instagram = req.body.instagram;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.body.id }).then(profile => {
      if (profile) {
        //Update user profile
        Profile.findByIdAndUpdate(
          { user: req.body.id },
          { $set: profilefields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        //Create Profile

        //Check if Profile Exists
        Profile.findOne({ handle: profilefields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Profile Already Exists";
            res.status(400).json(errors);
          } else {
            //Create New Profile
            new Profile(profilefields)
              .save()
              .then(profile => res.json(profile));
          }
        });
      }
    });
  }
);

//@route  POST api/profile/experience
//@desc   Add Current User Profile Experience
//@access Public
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profileExp => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profileExp.experience.unshift(newExp);
      profileExp.save().then(newProfile => {
        res.json(newProfile);
      });
    });
  }
);

//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete Current User Profile Experience By Id
//@access Public
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profileExp => {
      const removeINdex = profileExp.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profileExp.experience.splice(removeINdex, 1);

      profileExp
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

//@route  POST api/profile/education
//@desc   Add Current User Profile Education
//@access Public
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profileEdu => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add Profiles in Array and Save it
      profileEdu.education.unshift(newEdu);
      profileEdu.save().then(newProfileEdu => {
        res.json(newProfileEdu);
      });
    });
  }
);

//@route  DELETE api/profile/education/:edu_id
//@desc   Delete Current User Profile education By Id
//@access Public
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id }).then(profileEdu => {
      const removeINdex = profileEdu.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      //Remove From Education Array
      profileEdu.education.splice(removeINdex, 1);
      profileEdu
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    });
  }
);
module.exports = router;
