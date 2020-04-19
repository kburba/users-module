import React from 'react';
import { FieldError } from 'react-hook-form';

export default function SelectField({
    label,
    inputRef,
    name,
    placeholder,
    defaultValue,
    error,
    options,
}: {
    label?: string;
    inputRef?: any;
    name: string;
    placeholder?: string;
    defaultValue?: string | number;
    error?: string | FieldError | React.ReactElement;
    options: {
        text: string;
        value: string | number;
    }[];
}) {
    return (
        <div className="formField formField--select">
            {label && <label htmlFor={name}>{label}</label>}
            <div className="select-wrapper">
                <select
                    name={name}
                    ref={inputRef}
                    placeholder={placeholder}
                    // onChange={(e) => handleTypeChange(e.target.value)}
                    defaultValue={defaultValue}
                >
                    <option value="" disabled selected hidden>
                        Select
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className="formField--error">{error}</div>}
        </div>
    );
}
