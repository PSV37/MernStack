import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <NavLink to="/sign-up" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </NavLink>
                <NavLink to="/login" className="btn btn-lg btn-light">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
