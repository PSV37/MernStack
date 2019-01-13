const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatoePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "post must be between 10 to 300 chars";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
