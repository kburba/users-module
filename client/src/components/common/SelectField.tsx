import React from 'react';
import { FieldError } from 'react-hook-form';

export type SelectFieldOption = {
  text: string;
  value: string | number;
};
export default function SelectField({
  defaultValue,
  disabled,
  error,
  inputRef,
  label,
  name,
  onChange,
  options,
  placeholder,
  value,
}: {
  defaultValue?: string | number;
  disabled?: boolean;
  error?: string | FieldError | React.ReactElement;
  inputRef?: any;
  label?: string;
  name: string;
  onChange?: (name: string, value: string | number) => void;
  options: SelectFieldOption[];
  placeholder?: string;
  value?: string | number;
}) {
  return (
    <div className="formField formField--select">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="select-wrapper">
        <select
          name={name}
          ref={inputRef}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(name, e.target.value)}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            Select
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {error && <div className="formField--error">{error}</div>}
      </div>
    </div>
  );
}
