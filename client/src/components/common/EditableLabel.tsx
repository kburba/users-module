import React, { useState } from 'react';

const ENTER_KEY_CODE = 13;
const DEFAULT_LABEL_PLACEHOLDER = 'Click To Edit';

export default function EditableLabel({
  defaultText,
  inputClassName,
  inputPlaceHolder,
  inputRef,
  inputTabIndex,
  labelClassName,
  labelPlaceHolder,
  name,
  onFocus,
  onFocusOut,
}) {
  const [text, setText] = useState(defaultText || '');
  const [isEditing, setIsEditing] = useState(false);

  function isTextValueValid() {
    return typeof text !== 'undefined' && text.trim().length > 0;
  }

  function handleFocus() {
    if (isEditing) {
      if (typeof onFocusOut === 'function') {
        onFocusOut(text);
      }
    } else {
      if (typeof onFocus === 'function') {
        onFocus(text);
      }
    }

    if (isTextValueValid()) {
      setIsEditing(!isEditing);
    } else {
      if (isEditing) {
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    }
  }

  function handleChange({ target: { value } }) {
    setText(value);
  }

  function handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      handleEnterKey();
    }
  }

  function handleEnterKey() {
    handleFocus();
  }

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          ref={inputRef}
          name={name}
          className={inputClassName}
          value={text}
          onChange={handleChange}
          onBlur={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={inputPlaceHolder}
          tabIndex={inputTabIndex}
          autoFocus
        />
      </div>
    );
  }

  const labelText = isTextValueValid()
    ? text
    : labelPlaceHolder || DEFAULT_LABEL_PLACEHOLDER;
  return (
    <div>
      <label className={labelClassName} onClick={handleFocus}>
        {labelText}
      </label>
    </div>
  );
}
