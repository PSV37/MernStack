import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileActions from "../dashboard/ProfileActions";
import Experience from "../dashboard/Experience";
import Education from "../dashboard/Education";
import { deleteCurrentUserAccount } from "../../actions/profileAction";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  deleteAccount = e => {
    this.props.deleteCurrentUserAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, isLoading } = this.props.profile;

    let dashboardContent;
    if (profile == null || isLoading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={"/profile/handle/balu"}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.deleteAccount} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>you have not yet profile please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
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
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteCurrentUserAccount }
)(Dashboard);
