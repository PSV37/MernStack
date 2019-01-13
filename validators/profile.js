const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatoeProfileInput(data) {
  let errors = {};

  if (!isEmpty(data)) {
    data.handle = !isEmpty(data.handle) ? data.handle : str("");
    data.skills = !isEmpty(data.skills) ? data.skills : str("");
    data.status = !isEmpty(data.status) ? data.status : str("");
  }

  if (!validator.isLength(data.handle, { min: 2, max: 6 })) {
    errors.handle = "Handle needs to between 2 to 6 chars";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Profile Skill field required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Profile Status required";
  }

  if (!isEmpty(data.website)) {
    if (validator.isURL(data.website)) {
      errors.website = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.youtub)) {
    if (validator.isURL(data.youtub)) {
      errors.youtub = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.liknedin)) {
    if (validator.isURL(data.liknedin)) {
      errors.liknedin = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (validator.isURL(data.facebook)) {
      errors.facebook = "Not a Valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (validator.isURL(data.twitter)) {
      errors.twitter = "Not a Valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (validator.isURL(data.instagram)) {
      errors.instagram = "Not a Valid URL";
    }
  }

  console.log(data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
