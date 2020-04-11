const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose").Schema;

module.exports = validateOrdersInput = data => {
  let errors = {};

  data.details = !isEmpty(data.details) ? data.details : {};

  if (Validator.isEmpty(data.details.name)) {
    errors.name = "Order name is required";
  }
  if (Validator.isEmpty(data.details.orderId)) {
    errors.orderId = "Order ID is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
