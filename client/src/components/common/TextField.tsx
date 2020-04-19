import React from 'react';
import { FieldError } from 'react-hook-form';
import classnames from 'classnames';

export default function TextField({
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
                <input
                    type="text"
                    autoFocus={autofocus}
                    ref={inputRef}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className={classnames({ error })}
                />
                {error && <div className="formField--error">{error}</div>}
            </div>
        </div>
    );
}
