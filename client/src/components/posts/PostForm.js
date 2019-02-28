import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postAction";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: "",
      errors: {}
    };
  }

  onChange = e => {
    console.log("onchanage event ");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    const postData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(postData);
    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaFieldGroup
                placeholder="Create a Post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
