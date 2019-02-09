import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/authAction";
import TextInputField from "../common/TextInputField";

class Register extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  //Handle onChange Event on input
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Handle onSubmit Event On Form
  onSubmit = e => {
    e.preventDefault();
    const registerUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.register(registerUser, this.props.history);
    console.log({ registerUser });
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.errors
    });
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Devor accountdux</p>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  name="name"
                  value={this.state.name}
                  placeholder="Name"
                  type="text"
                  onChange={this.onChange}
                  error={errors}
                />

                <TextInputField
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  type="text"
                  onChange={this.onChange}
                  error={errors}
                />

                <TextInputField
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                  error={errors}
                />

                <TextInputField
                  name="password2"
                  value={this.state.password2}
                  placeholder="Confirm Password"
                  type="password"
                  onChange={this.onChange}
                  error={errors}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { register }
)(withRouter(Register));
