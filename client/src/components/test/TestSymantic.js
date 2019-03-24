import React, { Component } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class TestSymantic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: ""
    };
  }

  render() {
    return (
      <PhoneInput
        placeholder="Enter phone number"
        value={this.state.phone}
        onChange={phone => this.setState({ phone })}
      />
    );
  }
}

export default TestSymantic;
