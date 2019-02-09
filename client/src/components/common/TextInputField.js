import React from "react";
import PropTypes from "prop-types";

const TextInputField = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  disabled,
  error
}) => {
  return (
    <div>
      {" "}
      <div className="form-group">
        <input
          type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {/*   <span style={{ color: "red" }}>{error.email ? error.email : null}</span> */}
      </div>
    </div>
  );
};

TextInputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string
};
TextInputField.defaultProps = {
  type: "text"
};

export default TextInputField;
