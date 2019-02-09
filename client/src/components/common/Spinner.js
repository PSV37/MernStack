import React, { Component } from "react";
import loading from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={loading}
        style={{ width: "100px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
