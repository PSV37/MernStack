import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { deleteExperience } from "../../actions/profileAction";

class Experience extends Component {
  onClickDelete = id => {
    this.props.deleteExperience(id, this.props.history);
  };

  render() {
    let experience;
    if (this.props.experience.length > 0) {
      experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onClickDelete.bind(this, exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      experience = (
        <h6 className="text-center" style={{ color: "green" }}>
          Not Created Experience Yet
        </h6>
      );
    }

    return (
      <div>
        <h4 className="mb4">Experience Credentials</h4>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
