const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose").Schema;

module.exports = validateServiceInput = data => {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Post type field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Post from field is required";
  }
  if (Validator.isEmpty(data.to)) {
    errors.to = "Post to field is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "Post price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
