import React from 'react';

export default function ErrorMessage({
  error,
}: {
  error: string | { message: string };
}) {
  function isObject(obj) {
    return typeof obj === 'object' && typeof obj.length === 'undefined';
  }
  // function isArr(obj) {
  //     return typeof obj === 'object' && typeof obj.length === 'number';
  // }

  let message;
  if (isObject(error) && typeof error !== 'string') {
    message = error.message;
  }
  if (typeof error === 'string') {
    message = error;
  }
  return (
    <div
      style={{
        color: 'darkred',
        padding: '15px',
        border: '1px solid darkred',
        borderRadius: '3px',
        backgroundColor: 'lightpink',
        margin: '15px 0',
      }}
    >
      {message}
    </div>
  );
}
