const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatoeExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title field required";
  }

  if (!validator.isEmail(data.company)) {
    errors.company = "Company is invalid";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From field requied";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
