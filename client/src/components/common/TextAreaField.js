import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string
};

export default TextAreaField;
