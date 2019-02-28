import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postAction";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.posts;
    console.log(posts);
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
