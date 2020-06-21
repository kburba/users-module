import React from 'react';
import { FieldError } from 'react-hook-form';
import classnames from 'classnames';
import EditableLabel from './EditableLabel';

export default function TextFieldEditable({
  label,
  autofocus,
  inputRef,
  name,
  placeholder,
  defaultValue,
  error,
}: {
  label?: string;
  autofocus?: boolean;
  inputRef?: any;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  error?: string | FieldError | React.ReactElement;
}) {
  return (
    <div className="formField formField--text">
      {label && <label htmlFor={name}>{label}</label>}
      <div>
        <EditableLabel
          defaultText={defaultValue}
          inputClassName="inputClass"
          inputPlaceHolder="input placeholder"
          inputRef={inputRef}
          inputTabIndex={0}
          labelClassName="labelClass"
          labelPlaceHolder={placeholder}
          name={name}
          onFocus={(value) => console.log('onFocus value', value)}
          onFocusOut={(value) => console.log('focusOut value', value)}
        />
        {error && <div className="formField--error">{error}</div>}
      </div>
    </div>
  );
}
