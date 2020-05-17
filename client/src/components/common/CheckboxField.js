import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const CheckBoxField = ({
  name,
  value,
  error,
  label,
  id,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-check mb-4">
      <input
        className={classnames('form-check-input', {
          'is-invalid': error,
        })}
        type="checkbox"
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        disabled={disabled}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.string,
  label: propTypes.string,
  id: propTypes.string,
};

CheckBoxField.defaultProps = {
  type: 'checkbox',
};

export default CheckBoxField;
