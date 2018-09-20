import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroupField = ({
  name,
  placeholder,
  value,
  error,
  type,
  icon,
  onChange,
  disabled
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type="text"
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroupField.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  icon: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string
};

InputGroupField.defaultProps = {
  type: "text"
};

export default InputGroupField;
