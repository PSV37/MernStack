const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatoeRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : " ";
  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";
  data.password2 = !isEmpty(data.password2) ? data.password2 : " ";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name Must be between 2 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field requied";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must in min 6 and max 30  ";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "password2 field requied";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
