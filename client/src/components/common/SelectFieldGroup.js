import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const SelectFieldGroup = ({
  name,
  error,
  value,
  info,
  options,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
      >
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string
};

export default SelectFieldGroup;
