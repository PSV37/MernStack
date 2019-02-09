import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, onChange, error, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      {" "}
      <div className="form-group">
        <select
          className="form-control form-control-lg"
          name={name}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
        {/*  <span style={{ color: "red" }}>{error.email ? error.email : null}</span> */}
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
