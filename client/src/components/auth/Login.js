import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
//import classnames from "classnames";
import TextInputField from "../common/TextInputField";

class Login extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  //Handle onChange Event on input
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
    this.setState({
      errors: nextProps.errors
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(loginUser);
    console.log({ loginUser });
  };

  render() {
    const { errors } = this.state;
    console.log(errors.email);
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>

              <form onSubmit={this.onSubmit}>
                <div>
                  <TextInputField
                    name="email"
                    value={this.state.email}
                    placeholder="Email Address"
                    type="email"
                    onChange={this.onChange}
                    error={this.errors}
                  />

                  <TextInputField
                    name="password"
                    value={this.state.password}
                    placeholder="Enter Password"
                    type="password"
                    onChange={this.onChange}
                    error={this.errors}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
