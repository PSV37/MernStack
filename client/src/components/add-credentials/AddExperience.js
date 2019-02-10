import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextInputField from "../common/TextInputField";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileAction";

class AddExperience extends Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.state = {
      company: "",
      title: "sdfsdf",
      location: "",
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
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      discription: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
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
      <div className="add-expirence">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="disply-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextInputField
                  name="company"
                  placeholder="Compnay"
                  value={this.state.company}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <TextInputField
                  name="title"
                  placeholder="TItla"
                  value={this.state.title}
                  onChange={this.onChangeInput}
                  error={this.errors}
                />
                <TextInputField
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
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
                  placeholder="To Date"
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
                  info="Tell us about the position"
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

AddExperience.propTypes = {
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
  { addExperience }
)(withRouter(AddExperience));
