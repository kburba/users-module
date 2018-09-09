const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = (data) => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Post text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}