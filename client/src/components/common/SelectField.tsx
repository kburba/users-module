import React from 'react';
import { FieldError } from 'react-hook-form';

export type SelectFieldOption = {
    text: string;
    value: string | number;
};
export default function SelectField({
    label,
    inputRef,
    name,
    placeholder,
    defaultValue,
    error,
    options,
    onChange,
    value,
}: {
    label?: string;
    inputRef?: any;
    name: string;
    placeholder?: string;
    defaultValue?: string | number;
    error?: string | FieldError | React.ReactElement;
    onChange?: (name: string, value: string | number) => void;
    value?: string | number;
    options: SelectFieldOption[];
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
