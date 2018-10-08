import React from "react";

export default function(props) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-1">
          <img
            className="rounded-circle d-none d-md-block"
            src={props.data.avatar}
            alt={props.data.name}
          />
          <br />
          <p className="text-center">{props.data.name}</p>
        </div>
        <div className="col-md-6">{props.data.text}</div>
      </div>
    </div>
  );
}
