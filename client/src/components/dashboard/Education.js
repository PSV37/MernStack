import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { deleteEducation } from "../../actions/profileAction";

class Education extends Component {
  onClickDelete = id => {
    this.props.deleteEducation(id, this.props.history);
  };

  render() {
    let education;
    if (this.props.education.length > 0) {
      education = this.props.education.map(exp => (
        <tr key={exp._id}>
          <td>{exp.school}</td>
          <td>{exp.degree}</td>
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
      education = (
        <h6
          className="text-center d-none d-md-block"
          style={{ color: "green" }}
        >
          Not Created Education Yet
        </h6>
      );
    }

    return (
      <div>
        <h4 className="mb4">Education Credentials</h4>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(withRouter(Education));
