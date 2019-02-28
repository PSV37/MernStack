import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({ name, value, placeholder, onChange, error }) => {
  console.log({ name });
  return (
    <div>
      {" "}
      <div className="form-group">
        <textarea
          className="form-control form-control-lg"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
        />
        {/*    <span style={{ color: "red" }}>{error.email ? error.email : null}</span> */}
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaFieldGroup;
