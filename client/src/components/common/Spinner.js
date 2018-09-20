import React from "react";
import Spinner from "../../img/spinner.svg";

export default () => {
  return (
    <div>
      <img
        src={Spinner}
        alt="Loading..."
        style={{ width: "100px", height: "100px", display: "block" }}
      />
    </div>
  );
};
