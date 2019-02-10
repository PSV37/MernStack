import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextInputField from "../common/TextInputField";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileAction";

class AddEducation extends Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  //Get and CHeck Server side errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("onchange event");
  };

  onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      discription: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  onCheck = e => {
    console.log("checked or unchecked");
    /*  this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    }); */
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
    console.log(this.state.current);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="disply-4 text-center">Add Education</h1>
              <p className="lead text-center">Add your Education Details</p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  name="degree"
                  placeholder="* Degree"
                  value={this.state.degree}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <TextInputField
                  name="school"
                  placeholder="* School"
                  value={this.state.school}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <TextInputField
                  name="fieldofstudy"
                  placeholder="* Field Of Study"
                  value={this.state.fieldofstudy}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <h6>From Date</h6>
                <TextInputField
                  name="from"
                  placeholder="From Date"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <h6>TO Date</h6>
                <TextInputField
                  name="to"
                  placeholder="* To Date"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChangeInput}
                  error={this.errors}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChangeInput}
                  error={this.errors}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
