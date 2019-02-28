import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../../actions/postAction";

class Post extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <h1>Post Page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
