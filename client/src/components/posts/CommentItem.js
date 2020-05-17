import React from 'react';

export default function (props) {
  return (
    <div className="card card-body card-footer p-2">
      <div className="row">
        <div className="col-md-2">
          <img
            className="rounded-circle d-none d-md-block"
            src={props.data.avatar}
            alt={props.data.name}
          />
          <p className="text-center small mb-0">{props.data.name}</p>
        </div>
        <div className="col-md-6 small">{props.data.text}</div>
      </div>
    </div>
  );
}
