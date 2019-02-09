import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  value,
  placeholder,
  onChange,
  type,
  icon,
  error
}) => {
  return (
    <div>
      {" "}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          className="form-control form-control-lg"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {/*  <span style={{ color: "red" }}>{error.email ? error.email : null}</span> */}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default InputGroup;
